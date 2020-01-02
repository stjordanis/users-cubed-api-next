import http from 'http'
import https from 'https'
import { stringify } from 'querystring'
import legit from 'legit'
import { promisify } from 'util'
import { validate } from 'isemail'

import { protoResponse, decode } from '../proto'
import db from '../db'
import { t } from '../translations'
import { apiAuth } from '../auth'
import { handlers } from '../../handlers'

export const sendErr = (status, msg, final) => {
  protoResponse(status, { error: msg }, 'error', 'Error', final)
}

export const sendOk = (final) => {
  protoResponse(200, { status: 'Ok' }, 'ok', 'Ok', final)
}

export const _request = (schema, obj, done) => {
  const schemaLib = typeof schema === 'string' && schema === 'http' ? http : https
  const payloadString = typeof obj.data === 'object' ? stringify(obj.data) : false
  if (payloadString && typeof obj.headers === 'string') {
    obj.headers['Content-Length'] = Buffer.byteLength(payloadString)
    const req = schemaLib.request(obj, (res) => {
      const status = res.statusCode
      if (status === 200 || status === 201) {
        done()
      } else {
        done(status)
      }
    })

    req.on('error', (err) => {
      done(err.message)
    })

    req.on('timeout', () => {
      done(t('error.timeout'))
    })

    req.write(payloadString)
    req.end()
  } else {
    done(t('error.required'))
  }
}

export const request = promisify(_request)

export const finalizeRequest = (collection, id, action, obj, final) => {
  if (typeof obj === 'object') {
    db[action](collection, id, obj, async (err, data) => {
      if (!err) {
        final(null, { s: 200, o: { status: 'ok' } })
      } else {
        final({ s: 500, e: t('error.internal') })
      }
    })
  } else {
    db[action](collection, id, async (err, data) => {
      if (!err) {
        final(null, { s: 200, o: { status: 'ok' } })
      } else {
        final({ s: 500, e: t('error.internal') })
      }
    })
  }
}

const _validEmail = async (email, done) => {
  if (validate(email)) {
    const r = await legit(email).catch(() => done(null, false))
    if (r && r.isValid) {
      done(null, email)
    } else {
      done(null, false)
    }
  } else {
    done(null, false)
  }
}

export const validEmail = promisify(_validEmail)

const _decodeRequest = async (event, done) => {
  const authorized = await apiAuth(event).catch((e) => done(e))
  if (authorized) {
    const action = event.headers.Action
    const handler = typeof handlers[action] !== 'undefined' ? handlers[action] : handlers.NOT_FOUND
    const body = await decode(handler.file, event.body, handler.class).catch((e) => done(e))
    const obj = {
      body,
      headers: event.headers
    }
    done(null, obj)
  } else {
    done(t('error.unauthorized'))
  }
}

export const decodeRequest = promisify(_decodeRequest)

export const response = async (event, callback) => {
  const payload = await decodeRequest(event).catch((e) => sendErr(403, e, callback))
  if (payload) {
    const action = event.headers.Action
    const handler = typeof handlers[action] !== 'undefined' ? handlers[action] : handlers.NOT_FOUND
    const { s, o } = await handler.h(payload).catch(() => sendErr(500, t('error.server'), callback))
    if (s && o) {
      protoResponse(s, o, handler.file, handler.class, (err, res) => {
        if (!err && res) {
          callback(null, res)
        } else {
          sendErr(err.s, err.e, callback)
        }
      })
    } else {
      sendErr(500, t('error.server'), callback)
    }
  } else {
    sendErr(403, t('error.unauthorized'), callback)
  }
}
