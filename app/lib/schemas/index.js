import { promisify } from 'util'

import { validEmail } from '../utils'
import { t } from '../translations'

export const dialCodes = [
  { name: 'Afghanistan', dial: '+93', code: 'AF' },
  { name: 'Aland Islands', dial: '+358', code: 'AX' },
  { name: 'Albania', dial: '+355', code: 'AL' },
  { name: 'Algeria', dial: '+213', code: 'DZ' },
  { name: 'AmericanSamoa', dial: '+1684', code: 'AS' },
  { name: 'Andorra', dial: '+376', code: 'AD' },
  { name: 'Angola', dial: '+244', code: 'AO' },
  { name: 'Anguilla', dial: '+1264', code: 'AI' },
  { name: 'Antarctica', dial: '+672', code: 'AQ' },
  { name: 'Antigua and Barbuda', dial: '+1268', code: 'AG' },
  { name: 'Argentina', dial: '+54', code: 'AR' },
  { name: 'Armenia', dial: '+374', code: 'AM' },
  { name: 'Aruba', dial: '+297', code: 'AW' },
  { name: 'Australia', dial: '+61', code: 'AU' },
  { name: 'Austria', dial: '+43', code: 'AT' },
  { name: 'Azerbaijan', dial: '+994', code: 'AZ' },
  { name: 'Bahamas', dial: '+1242', code: 'BS' },
  { name: 'Bahrain', dial: '+973', code: 'BH' },
  { name: 'Bangladesh', dial: '+880', code: 'BD' },
  { name: 'Barbados', dial: '+1246', code: 'BB' },
  { name: 'Belarus', dial: '+375', code: 'BY' },
  { name: 'Belgium', dial: '+32', code: 'BE' },
  { name: 'Belize', dial: '+501', code: 'BZ' },
  { name: 'Benin', dial: '+229', code: 'BJ' },
  { name: 'Bermuda', dial: '+1441', code: 'BM' },
  { name: 'Bhutan', dial: '+975', code: 'BT' },
  { name: 'Bolivia, Plurinational State of', dial: '+591', code: 'BO' },
  { name: 'Bosnia and Herzegovina', dial: '+387', code: 'BA' },
  { name: 'Botswana', dial: '+267', code: 'BW' },
  { name: 'Brazil', dial: '+55', code: 'BR' },
  { name: 'British Indian Ocean Territory', dial: '+246', code: 'IO' },
  { name: 'Brunei Darussalam', dial: '+673', code: 'BN' },
  { name: 'Bulgaria', dial: '+359', code: 'BG' },
  { name: 'Burkina Faso', dial: '+226', code: 'BF' },
  { name: 'Burundi', dial: '+257', code: 'BI' },
  { name: 'Cambodia', dial: '+855', code: 'KH' },
  { name: 'Cameroon', dial: '+237', code: 'CM' },
  { name: 'Canada', dial: '+1', code: 'CA' },
  { name: 'Cape Verde', dial: '+238', code: 'CV' },
  { name: 'Cayman Islands', dial: '+ 345', code: 'KY' },
  { name: 'Central African Republic', dial: '+236', code: 'CF' },
  { name: 'Chad', dial: '+235', code: 'TD' },
  { name: 'Chile', dial: '+56', code: 'CL' },
  { name: 'China', dial: '+86', code: 'CN' },
  { name: 'Christmas Island', dial: '+61', code: 'CX' },
  { name: 'Cocos (Keeling) Islands', dial: '+61', code: 'CC' },
  { name: 'Colombia', dial: '+57', code: 'CO' },
  { name: 'Comoros', dial: '+269', code: 'KM' },
  { name: 'Congo', dial: '+242', code: 'CG' },
  { name: 'Congo, The Democratic Republic of the Congo', dial: '+243', code: 'CD' },
  { name: 'Cook Islands', dial: '+682', code: 'CK' },
  { name: 'Costa Rica', dial: '+506', code: 'CR' },
  { name: 'Cote d\'Ivoire', dial: '+225', code: 'CI' },
  { name: 'Croatia', dial: '+385', code: 'HR' },
  { name: 'Cuba', dial: '+53', code: 'CU' },
  { name: 'Cyprus', dial: '+357', code: 'CY' },
  { name: 'Czech Republic', dial: '+420', code: 'CZ' },
  { name: 'Denmark', dial: '+45', code: 'DK' },
  { name: 'Djibouti', dial: '+253', code: 'DJ' },
  { name: 'Dominica', dial: '+1767', code: 'DM' },
  { name: 'Dominican Republic', dial: '+1849', code: 'DO' },
  { name: 'Ecuador', dial: '+593', code: 'EC' },
  { name: 'Egypt', dial: '+20', code: 'EG' },
  { name: 'El Salvador', dial: '+503', code: 'SV' },
  { name: 'Equatorial Guinea', dial: '+240', code: 'GQ' },
  { name: 'Eritrea', dial: '+291', code: 'ER' },
  { name: 'Estonia', dial: '+372', code: 'EE' },
  { name: 'Ethiopia',  code: 'ET' },
  { name: 'Falkland Islands (Malvinas)', dial: '+500', code: 'FK' },
  { name: 'Faroe Islands', dial: '+298', code: 'FO' },
  { name: 'Fiji', dial: '+679', code: 'FJ' },
  { name: 'Finland', dial: '+358', code: 'FI' },
  { name: 'France', dial: '+33', code: 'FR' },
  { name: 'French Guiana', dial: '+594', code: 'GF' },
  { name: 'French Polynesia', dial: '+689', code: 'PF' },
  { name: 'Gabon', dial: '+241', code: 'GA' },
  { name: 'Gambia', dial: '+220', code: 'GM' },
  { name: 'Georgia', dial: '+995', code: 'GE' },
  { name: 'Germany', dial: '+49', code: 'DE' },
  { name: 'Ghana', dial: '+233', code: 'GH' },
  { name: 'Gibraltar', dial: '+350', code: 'GI' },
  { name: 'Greece', dial: '+30', code: 'GR' },
  { name: 'Greenland', dial: '+299', code: 'GL' },
  { name: 'Grenada', dial: '+1473', code: 'GD' },
  { name: 'Guadeloupe', dial: '+590', code: 'GP' },
  { name: 'Guam', dial: '+1671', code: 'GU' },
  { name: 'Guatemala', dial: '+502', code: 'GT' },
  { name: 'Guernsey', dial: '+44', code: 'GG' },
  { name: 'Guinea', dial: '+224', code: 'GN' },
  { name: 'Guinea-Bissau', dial: '+245', code: 'GW' },
  { name: 'Guyana', dial: '+595', code: 'GY' },
  { name: 'Haiti', dial: '+509', code: 'HT' },
  { name: 'Holy See (Vatican City State)', dial: '+379', code: 'VA' },
  { name: 'Honduras', dial: '+504', code: 'HN' },
  { name: 'Hong Kong', dial: '+852', code: 'HK' },
  { name: 'Hungary', dial: '+36', code: 'HU' },
  { name: 'Iceland', dial: '+354', code: 'IS' },
  { name: 'India', dial: '+91', code: 'IN' },
  { name: 'Indonesia', dial: '+62', code: 'ID' },
  { name: 'Iran, Islamic Republic of Persian Gulf', dial: '+98', code: 'IR' },
  { name: 'Iraq', dial: '+964', code: 'IQ' },
  { name: 'Ireland', dial: '+353', code: 'IE' },
  { name: 'Isle of Man', dial: '+44', code: 'IM' },
  { name: 'Israel', dial: '+972', code: 'IL' },
  { name: 'Italy', dial: '+39', code: 'IT' },
  { name: 'Jamaica', dial: '+1876', code: 'JM' },
  { name: 'Japan', dial: '+81', code: 'JP' },
  { name: 'Jersey', dial: '+44', code: 'JE' },
  { name: 'Jordan', dial: '+962', code: 'JO' },
  { name: 'Kazakhstan', dial: '+77', code: 'KZ' },
  { name: 'Kenya', dial: '+254', code: 'KE' },
  { name: 'Kiribati', dial: '+686', code: 'KI' },
  { name: 'Korea, Democratic People\'s Republic of Korea', dial: '+850', code: 'KP' },
  { name: 'Korea, Republic of South Korea', dial: '+82', code: 'KR' },
  { name: 'Kuwait', dial: '+965', code: 'KW' },
  { name: 'Kyrgyzstan', dial: '+996', code: 'KG' },
  { name: 'Laos', dial: '+856', code: 'LA' },
  { name: 'Latvia', dial: '+371', code: 'LV' },
  { name: 'Lebanon', dial: '+961', code: 'LB' },
  { name: 'Lesotho', dial: '+266', code: 'LS' },
  { name: 'Liberia', dial: '+231', code: 'LR' },
  { name: 'Libyan Arab Jamahiriya', dial: '+218', code: 'LY' },
  { name: 'Liechtenstein', dial: '+423', code: 'LI' },
  { name: 'Lithuania', dial: '+370', code: 'LT' },
  { name: 'Luxembourg', dial: '+352', code: 'LU' },
  { name: 'Macao', dial: '+853', code: 'MO' },
  { name: 'Macedonia', dial: '+389', code: 'MK' },
  { name: 'Madagascar', dial: '+261', code: 'MG' },
  { name: 'Malawi', dial: '+265', code: 'MW' },
  { name: 'Malaysia', dial: '+60', code: 'MY' },
  { name: 'Maldives', dial: '+960', code: 'MV' },
  { name: 'Mali', dial: '+223', code: 'ML' },
  { name: 'Malta', dial: '+356', code: 'MT' },
  { name: 'Marshall Islands', dial: '+692', code: 'MH' },
  { name: 'Martinique', dial: '+596', code: 'MQ' },
  { name: 'Mauritania', dial: '+222', code: 'MR' },
  { name: 'Mauritius', dial: '+230', code: 'MU' },
  { name: 'Mayotte', dial: '+262', code: 'YT' },
  { name: 'Mexico', dial: '+52', code: 'MX' },
  { name: 'Micronesia, Federated States of Micronesia', dial: '+691', code: 'FM' },
  { name: 'Moldova', dial: '+373', code: 'MD' },
  { name: 'Monaco', dial: '+377', code: 'MC' },
  { name: 'Mongolia', dial: '+976', code: 'MN' },
  { name: 'Montenegro', dial: '+382', code: 'ME' },
  { name: 'Montserrat', dial: '+1664', code: 'MS' },
  { name: 'Morocco', dial: '+212', code: 'MA' },
  { name: 'Mozambique', dial: '+258', code: 'MZ' },
  { name: 'Myanmar', dial: '+95', code: 'MM' },
  { name: 'Namibia', dial: '+264', code: 'NA' },
  { name: 'Nauru', dial: '+674', code: 'NR' },
  { name: 'Nepal', dial: '+977', code: 'NP' },
  { name: 'Netherlands', dial: '+31', code: 'NL' },
  { name: 'Netherlands Antilles', dial: '+599', code: 'AN' },
  { name: 'New Caledonia', dial: '+687', code: 'NC' },
  { name: 'New Zealand', dial: '+64', code: 'NZ' },
  { name: 'Nicaragua', dial: '+505', code: 'NI' },
  { name: 'Niger', dial: '+227', code: 'NE' },
  { name: 'Nigeria', dial: '+234', code: 'NG' },
  { name: 'Niue', dial: '+683', code: 'NU' },
  { name: 'Norfolk Island', dial: '+672', code: 'NF' },
  { name: 'Northern Mariana Islands', dial: '+1670', code: 'MP' },
  { name: 'Norway', dial: '+47', code: 'NO' },
  { name: 'Oman', dial: '+968', code: 'OM' },
  { name: 'Pakistan', dial: '+92', code: 'PK' },
  { name: 'Palau', dial: '+680', code: 'PW' },
  { name: 'Palestinian Territory, Occupied', dial: '+970', code: 'PS' },
  { name: 'Panama', dial: '+507', code: 'PA' },
  { name: 'Papua New Guinea', dial: '+675', code: 'PG' },
  { name: 'Paraguay', dial: '+595', code: 'PY' },
  { name: 'Peru', dial: '+51', code: 'PE' },
  { name: 'Philippines', dial: '+63', code: 'PH' },
  { name: 'Pitcairn', dial: '+872', code: 'PN' },
  { name: 'Poland', dial: '+48', code: 'PL' },
  { name: 'Portugal', dial: '+351', code: 'PT' },
  { name: 'Puerto Rico', dial: '+1939', code: 'PR' },
  { name: 'Qatar', dial: '+974', code: 'QA' },
  { name: 'Romania', dial: '+40', code: 'RO' },
  { name: 'Russia', dial: '+7', code: 'RU' },
  { name: 'Rwanda', dial: '+250', code: 'RW' },
  { name: 'Reunion', dial: '+262', code: 'RE' },
  { name: 'Saint Barthelemy', dial: '+590', code: 'BL' },
  { name: 'Saint Helena, Ascension and Tristan Da Cunha', dial: '+290', code: 'SH' },
  { name: 'Saint Kitts and Nevis', dial: '+1869', code: 'KN' },
  { name: 'Saint Lucia', dial: '+1758', code: 'LC' },
  { name: 'Saint Martin', dial: '+590', code: 'MF' },
  { name: 'Saint Pierre and Miquelon', dial: '+508', code: 'PM' },
  { name: 'Saint Vincent and the Grenadines', dial: '+1784', code: 'VC' },
  { name: 'Samoa', dial: '+685', code: 'WS' },
  { name: 'San Marino', dial: '+378', code: 'SM' },
  { name: 'Sao Tome and Principe', dial: '+239', code: 'ST' },
  { name: 'Saudi Arabia', dial: '+966', code: 'SA' },
  { name: 'Senegal', dial: '+221', code: 'SN' },
  { name: 'Serbia', dial: '+381', code: 'RS' },
  { name: 'Seychelles', dial: '+248', code: 'SC' },
  { name: 'Sierra Leone', dial: '+232', code: 'SL' },
  { name: 'Singapore', dial: '+65', code: 'SG' },
  { name: 'Slovakia', dial: '+421', code: 'SK' },
  { name: 'Slovenia', dial: '+386', code: 'SI' },
  { name: 'Solomon Islands', dial: '+677', code: 'SB' },
  { name: 'Somalia', dial: '+252', code: 'SO' },
  { name: 'South Africa', dial: '+27', code: 'ZA' },
  { name: 'South Sudan', dial: '+211', code: 'SS' },
  { name: 'South Georgia and the South Sandwich Islands', dial: '+500', code: 'GS' },
  { name: 'Spain', dial: '+34', code: 'ES' },
  { name: 'Sri Lanka', dial: '+94', code: 'LK' },
  { name: 'Sudan', dial: '+249', code: 'SD' },
  { name: 'Suriname', dial: '+597', code: 'SR' },
  { name: 'Svalbard and Jan Mayen', dial: '+47', code: 'SJ' },
  { name: 'Swaziland', dial: '+268', code: 'SZ' },
  { name: 'Sweden', dial: '+46', code: 'SE' },
  { name: 'Switzerland', dial: '+41', code: 'CH' },
  { name: 'Syrian Arab Republic', dial: '+963', code: 'SY' },
  { name: 'Taiwan', dial: '+886', code: 'TW' },
  { name: 'Tajikistan', dial: '+992', code: 'TJ' },
  { name: 'Tanzania, United Republic of Tanzania', dial: '+255', code: 'TZ' },
  { name: 'Thailand', dial: '+66', code: 'TH' },
  { name: 'Timor-Leste', dial: '+670', code: 'TL' },
  { name: 'Togo', dial: '+228', code: 'TG' },
  { name: 'Tokelau', dial: '+690', code: 'TK' },
  { name: 'Tonga', dial: '+676', code: 'TO' },
  { name: 'Trinidad and Tobago', dial: '+1868', code: 'TT' },
  { name: 'Tunisia', dial: '+216', code: 'TN' },
  { name: 'Turkey', dial: '+90', code: 'TR' },
  { name: 'Turkmenistan', dial: '+993', code: 'TM' },
  { name: 'Turks and Caicos Islands', dial: '+1649', code: 'TC' },
  { name: 'Tuvalu', dial: '+688', code: 'TV' },
  { name: 'Uganda', dial: '+256', code: 'UG' },
  { name: 'Ukraine', dial: '+380', code: 'UA' },
  { name: 'United Arab Emirates', dial: '+971', code: 'AE' },
  { name: 'United Kingdom', dial: '+44', code: 'GB' },
  { name: 'United States', dial: '+1', code: 'US' },
  { name: 'Uruguay', dial: '+598', code: 'UY' },
  { name: 'Uzbekistan', dial: '+998', code: 'UZ' },
  { name: 'Vanuatu', dial: '+678', code: 'VU' },
  { name: 'Venezuela, Bolivarian Republic of Venezuela', dial: '+58', code: 'VE' },
  { name: 'Vietnam', dial: '+84', code: 'VN' },
  { name: 'Virgin Islands, British', dial: '+1284', code: 'VG' },
  { name: 'Virgin Islands, U.S.', dial: '+1340', code: 'VI' },
  { name: 'Wallis and Futuna', dial: '+681', code: 'WF' },
  { name: 'Yemen', dial: '+967', code: 'YE' },
  { name: 'Zambia', dial: '+260', code: 'ZM' },
  { name: 'Zimbabwe', dial: '+263', code: 'ZW' }
]

export const countriesSchema = {
  title: 'Countries schema v.1.0',
  type: 'array',
  required: ['key', 'country'],
  properties: {
    key: {
      type: 'string',
      uniqueItems: true,
      maxLength: 2,
      minLength: 2
    },
    country: {
      type: 'string',
      uniqueItems: true
    }
  }
}

export const dialCodeSchema = {
  title: 'Dial Code schema v.1.0',
  type: 'array',
  required: ['name', 'dial', 'code'],
  properties: {
    name: {
      type: 'string',
      uniqueItems: true
    },
    dial: {
      type: 'string',
      uniqueItems: true
    },
    code: {
      type: 'string',
      uniqueItems: true,
      maxLength: 2,
      minLength: 2
    }
  }
}

export const countries = [
  { key: '', country: '' },
  { key: 'af', country: 'Afghanistan' },
  { key: 'ax', country: 'Åland Islands' },
  { key: 'al', country: 'Albania' },
  { key: 'dz', country: 'Algeria' },
  { key: 'as', country: 'American Samoa' },
  { key: 'ad', country: 'Andorra' },
  { key: 'ao', country: 'Angola' },
  { key: 'ai', country: 'Anguilla' },
  { key: 'aq', country: 'Antarctica' },
  { key: 'ag', country: 'Antigua and Barbuda' },
  { key: 'ar', country: 'Argentina' },
  { key: 'am', country: 'Armenia' },
  { key: 'aw', country: 'Aruba' },
  { key: 'au', country: 'Australia' },
  { key: 'at', country: 'Austria' },
  { key: 'az', country: 'Azerbaijan' },
  { key: 'bs', country: 'Bahamas' },
  { key: 'bh', country: 'Bahrain' },
  { key: 'bd', country: 'Bangladesh' },
  { key: 'bb', country: 'Barbados' },
  { key: 'by', country: 'Belarus' },
  { key: 'be', country: 'Belgium' },
  { key: 'bz', country: 'Belize' },
  { key: 'bj', country: 'Benin' },
  { key: 'bm', country: 'Bermuda' },
  { key: 'bt', country: 'Bhutan' },
  { key: 'bo', country: 'Bolivia (Plurinational State of)' },
  { key: 'bq', country: 'Bonaire, Sint Eustatius and Saba' },
  { key: 'ba', country: 'Bosnia and Herzegovina' },
  { key: 'bw', country: 'Botswana' },
  { key: 'bv', country: 'Bouvet Island' },
  { key: 'br', country: 'Brazil' },
  { key: 'io', country: 'British Indian Ocean Territory' },
  { key: 'bn', country: 'Brunei Darussalam' },
  { key: 'bg', country: 'Bulgaria' },
  { key: 'bf', country: 'Burkina Faso' },
  { key: 'bi', country: 'Burundi' },
  { key: 'kh', country: 'Cambodia' },
  { key: 'cm', country: 'Cameroon' },
  { key: 'ca', country: 'Canada' },
  { key: 'cv', country: 'Cabo Verde' },
  { key: 'ky', country: 'Cayman Islands' },
  { key: 'cf', country: 'Central African Republic' },
  { key: 'td', country: 'Chad' },
  { key: 'cl', country: 'Chile' },
  { key: 'cn', country: 'China' },
  { key: 'cx', country: 'Christmas Island' },
  { key: 'cc', country: 'Cocos (Keeling) Islands' },
  { key: 'co', country: 'Colombia' },
  { key: 'km', country: 'Comoros' },
  { key: 'cg', country: 'Congo' },
  { key: 'cd', country: 'Congo (Democratic Republic of the)' },
  { key: 'ck', country: 'Cook Islands' },
  { key: 'cr', country: 'Costa Rica' },
  { key: 'ci', country: 'Côte d\'Ivoire' },
  { key: 'hr', country: 'Croatia' },
  { key: 'cu', country: 'Cuba' },
  { key: 'cw', country: 'Curaçao' },
  { key: 'cy', country: 'Cyprus' },
  { key: 'cz', country: 'Czech Republic' },
  { key: 'dk', country: 'Denmark' },
  { key: 'dj', country: 'Djibouti' },
  { key: 'dm', country: 'Dominica' },
  { key: 'do', country: 'Dominican Republic' },
  { key: 'ec', country: 'Ecuador' },
  { key: 'eg', country: 'Egypt' },
  { key: 'sv', country: 'El Salvador' },
  { key: 'gq', country: 'Equatorial Guinea' },
  { key: 'er', country: 'Eritrea' },
  { key: 'ee', country: 'Estonia' },
  { key: 'et', country: 'Ethiopia' },
  { key: 'eu', country: 'European Union' },
  { key: 'fk', country: 'Falkland Islands (Malvinas)' },
  { key: 'fo', country: 'Faroe Islands' },
  { key: 'fj', country: 'Fiji' },
  { key: 'fi', country: 'Finland' },
  { key: 'fr', country: 'France' },
  { key: 'gf', country: 'French Guiana' },
  { key: 'pf', country: 'French Polynesia' },
  { key: 'tf', country: 'French Southern Territories' },
  { key: 'ga', country: 'Gabon' },
  { key: 'gm', country: 'Gambia' },
  { key: 'ge', country: 'Georgia' },
  { key: 'de', country: 'Germany' },
  { key: 'gh', country: 'Ghana' },
  { key: 'gi', country: 'Gibraltar' },
  { key: 'gr', country: 'Greece' },
  { key: 'gl', country: 'Greenland' },
  { key: 'gd', country: 'Grenada' },
  { key: 'gp', country: 'Guadeloupe' },
  { key: 'gu', country: 'Guam' },
  { key: 'gt', country: 'Guatemala' },
  { key: 'gg', country: 'Guernsey' },
  { key: 'gn', country: 'Guinea' },
  { key: 'gw', country: 'Guinea-Bissau' },
  { key: 'gy', country: 'Guyana' },
  { key: 'ht', country: 'Haiti' },
  { key: 'hm', country: 'Heard Island and McDonald Islands' },
  { key: 'va', country: 'Holy See' },
  { key: 'hn', country: 'Honduras' },
  { key: 'hk', country: 'Hong Kong' },
  { key: 'hu', country: 'Hungary' },
  { key: 'is', country: 'Iceland' },
  { key: 'in', country: 'India' },
  { key: 'id', country: 'Indonesia' },
  { key: 'ir', country: 'Iran (Islamic Republic of)' },
  { key: 'iq', country: 'Iraq' },
  { key: 'ie', country: 'Ireland' },
  { key: 'im', country: 'Isle of Man' },
  { key: 'il', country: 'Israel' },
  { key: 'it', country: 'Italy' },
  { key: 'jm', country: 'Jamaica' },
  { key: 'jp', country: 'Japan' },
  { key: 'je', country: 'Jersey' },
  { key: 'jo', country: 'Jordan' },
  { key: 'kz', country: 'Kazakhstan' },
  { key: 'ke', country: 'Kenya' },
  { key: 'ki', country: 'Kiribati' },
  { key: 'kp', country: 'Korea (Democratic People\'s Republic of)' },
  { key: 'kr', country: 'Korea (Republic of)' },
  { key: 'kw', country: 'Kuwait' },
  { key: 'kg', country: 'Kyrgyzstan' },
  { key: 'la', country: 'Lao People\'s Democratic Republic' },
  { key: 'lv', country: 'Latvia' },
  { key: 'lb', country: 'Lebanon' },
  { key: 'ls', country: 'Lesotho' },
  { key: 'lr', country: 'Liberia' },
  { key: 'ly', country: 'Libya' },
  { key: 'li', country: 'Liechtenstein' },
  { key: 'lt', country: 'Lithuania' },
  { key: 'lu', country: 'Luxembourg' },
  { key: 'mo', country: 'Macao' },
  { key: 'mk', country: 'Macedonia (the former Yugoslav Republic of)' },
  { key: 'mg', country: 'Madagascar' },
  { key: 'mw', country: 'Malawi' },
  { key: 'my', country: 'Malaysia' },
  { key: 'mv', country: 'Maldives' },
  { key: 'ml', country: 'Mali' },
  { key: 'mt', country: 'Malta' },
  { key: 'mh', country: 'Marshall Islands' },
  { key: 'mq', country: 'Martinique' },
  { key: 'mr', country: 'Mauritania' },
  { key: 'mu', country: 'Mauritius' },
  { key: 'yt', country: 'Mayotte' },
  { key: 'mx', country: 'Mexico' },
  { key: 'fm', country: 'Micronesia (Federated States of)' },
  { key: 'md', country: 'Moldova (Republic of)' },
  { key: 'mc', country: 'Monaco' },
  { key: 'mn', country: 'Mongolia' },
  { key: 'me', country: 'Montenegro' },
  { key: 'ms', country: 'Montserrat' },
  { key: 'ma', country: 'Morocco' },
  { key: 'mz', country: 'Mozambique' },
  { key: 'mm', country: 'Myanmar' },
  { key: 'na', country: 'Namibia' },
  { key: 'nr', country: 'Nauru' },
  { key: 'np', country: 'Nepal' },
  { key: 'nl', country: 'Netherlands' },
  { key: 'nc', country: 'New Caledonia' },
  { key: 'nz', country: 'New Zealand' },
  { key: 'ni', country: 'Nicaragua' },
  { key: 'ne', country: 'Niger' },
  { key: 'ng', country: 'Nigeria' },
  { key: 'nu', country: 'Niue' },
  { key: 'nf', country: 'Norfolk Island' },
  { key: 'mp', country: 'Northern Mariana Islands' },
  { key: 'no', country: 'Norway' },
  { key: 'om', country: 'Oman' },
  { key: 'pk', country: 'Pakistan' },
  { key: 'pw', country: 'Palau' },
  { key: 'ps', country: 'Palestine, State of' },
  { key: 'pa', country: 'Panama' },
  { key: 'pg', country: 'Papua New Guinea' },
  { key: 'py', country: 'Paraguay' },
  { key: 'pe', country: 'Peru' },
  { key: 'ph', country: 'Philippines' },
  { key: 'pn', country: 'Pitcairn' },
  { key: 'pl', country: 'Poland' },
  { key: 'pt', country: 'Portugal' },
  { key: 'pr', country: 'Puerto Rico' },
  { key: 'qa', country: 'Qatar' },
  { key: 're', country: 'Réunion' },
  { key: 'ro', country: 'Romania' },
  { key: 'ru', country: 'Russian Federation' },
  { key: 'rw', country: 'Rwanda' },
  { key: 'bl', country: 'Saint Barthélemy' },
  { key: 'sh', country: 'Saint Helena, Ascension and Tristan da Cunha' },
  { key: 'kn', country: 'Saint Kitts and Nevis' },
  { key: 'lc', country: 'Saint Lucia' },
  { key: 'mf', country: 'Saint Martin (French part)' },
  { key: 'pm', country: 'Saint Pierre and Miquelon' },
  { key: 'vc', country: 'Saint Vincent and the Grenadines' },
  { key: 'ws', country: 'Samoa' },
  { key: 'sm', country: 'San Marino' },
  { key: 'st', country: 'Sao Tome and Principe' },
  { key: 'sa', country: 'Saudi Arabia' },
  { key: 'sn', country: 'Senegal' },
  { key: 'rs', country: 'Serbia' },
  { key: 'sc', country: 'Seychelles' },
  { key: 'sl', country: 'Sierra Leone' },
  { key: 'sg', country: 'Singapore' },
  { key: 'sx', country: 'Sint Maarten (Dutch part)' },
  { key: 'sk', country: 'Slovakia' },
  { key: 'si', country: 'Slovenia' },
  { key: 'sb', country: 'Solomon Islands' },
  { key: 'so', country: 'Somalia' },
  { key: 'za', country: 'South Africa' },
  { key: 'gs', country: 'South Georgia and the South Sandwich Islands' },
  { key: 'ss', country: 'South Sudan' },
  { key: 'es', country: 'Spain' },
  { key: 'lk', country: 'Sri Lanka' },
  { key: 'sd', country: 'Sudan' },
  { key: 'sr', country: 'Suriname' },
  { key: 'sj', country: 'Svalbard and Jan Mayen' },
  { key: 'sz', country: 'Swaziland' },
  { key: 'se', country: 'Sweden' },
  { key: 'ch', country: 'Switzerland' },
  { key: 'sy', country: 'Syrian Arab Republic' },
  { key: 'tw', country: 'Taiwan, Province of China' },
  { key: 'tj', country: 'Tajikistan' },
  { key: 'tz', country: 'Tanzania, United Republic of' },
  { key: 'th', country: 'Thailand' },
  { key: 'tl', country: 'Timor-Leste' },
  { key: 'tg', country: 'Togo' },
  { key: 'tk', country: 'Tokelau' },
  { key: 'to', country: 'Tonga' },
  { key: 'tt', country: 'Trinidad and Tobago' },
  { key: 'tn', country: 'Tunisia' },
  { key: 'tr', country: 'Turkey' },
  { key: 'tm', country: 'Turkmenistan' },
  { key: 'tc', country: 'Turks and Caicos Islands' },
  { key: 'tv', country: 'Tuvalu' },
  { key: 'ug', country: 'Uganda' },
  { key: 'ua', country: 'Ukraine' },
  { key: 'ae', country: 'United Arab Emirates' },
  { key: 'gb', country: 'United Kingdom' },
  { key: 'us', country: 'United States of America' },
  { key: 'um', country: 'United States Minor Outlying Islands' },
  { key: 'uy', country: 'Uruguay' },
  { key: 'uz', country: 'Uzbekistan' },
  { key: 'vu', country: 'Vanuatu' },
  { key: 've', country: 'Venezuela (Bolivarian Republic of)' },
  { key: 'vn', country: 'Viet Nam' },
  { key: 'vg', country: 'Virgin Islands (British)' },
  { key: 'vi', country: 'Virgin Islands (U.S.)' },
  { key: 'wf', country: 'Wallis and Futuna' },
  { key: 'eh', country: 'Western Sahara' },
  { key: 'ye', country: 'Yemen' },
  { key: 'zm', country: 'Zambia' },
  { key: 'zw', country: 'Zimbabwe' }
]

const _userFields = (data, email, done) => {
  const { firstName, lastName, dialCode, password, tosAgreement, phone, address, zipCode, city, country, avatarUrl, dob } = data.body
  const _phone = typeof phone === 'string' && phone.length >= 11 ? phone : false
  const _dialCode = typeof dialCode === 'string' && typeof dialCodes.filter((e) => e.dial === dialCode) !== 'undefined' ? dialCode : false
  const _firstName = typeof firstName === 'string' && firstName.trim().length > 0 ? firstName.trim() : false
  const _lastName = typeof lastName === 'string' && lastName.trim().length > 0 ? lastName.trim() : false
  const _password = typeof password === 'string' && password.trim().length > 11 ? password.trim() : false
  const _tosAgreement = typeof tosAgreement === 'boolean' && tosAgreement === true ? tosAgreement : false
  const _address = typeof address === 'string' && address.trim().length > 0 ? address.trim() : false
  const _zipCode = typeof zipCode === 'string' && zipCode.trim().length >= 5 ? zipCode.trim() : false
  const _city = typeof city === 'string' && city.trim().length > 0 ? city.trim() : false
  const _country = typeof country === 'string' && typeof countries.filter((e) => e.country === country) !== 'undefined' ? country.trim() : false
  const _avatarUrl = typeof avatarUrl === 'string' && avatarUrl.trim().length > 0 ? avatarUrl.trim() : false
  const _dob = typeof dob === 'string' && dob.trim().length > 0 ? dob.trim() : false

  done(null, {
    email,
    password: _password,
    tosAgreement: _tosAgreement,
    dialCode: _dialCode,
    phone: _phone,
    firstName: _firstName,
    lastName: _lastName,
    address: _address,
    zipCode: _zipCode,
    city: _city,
    country: _country,
    avatarUrl: _avatarUrl,
    dob: _dob
  })
}

const userFields = promisify(_userFields)

const loose = async (data, email) => {
  return await userFields(data, email)
}

const _userObj = async (data, done) => {
  if (typeof data.body === 'object') {
    const email = await validEmail(data.body.email).catch((e) => done(e))
    if (email) {
      const out = await loose(data, email)
      out.email = email
      done(null, out)
    } else {
      done(t('error.invalid_email'))
    }
  } else {
    done(t('error.no_payload'))
  }
}

export const user = promisify(_userObj)
