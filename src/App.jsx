import "./styles.css";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LANGUAGES, getLang, getLangMeta } from "./i18n.js";
import { getCountryName } from "./countryNames.js";

const FLAGS = [
  {id:1,naam:"Nederland",continent:"Europa",hoofdstad:"Amsterdam",vlag:"🇳🇱",symbool:false,kleuren:["rood","wit","blauw"]},
  {id:2,naam:"Duitsland",continent:"Europa",hoofdstad:"Berlijn",vlag:"🇩🇪",symbool:false,kleuren:["zwart","rood","geel"]},
  {id:3,naam:"Italië",continent:"Europa",hoofdstad:"Rome",vlag:"🇮🇹",symbool:false,kleuren:["groen","wit","rood"]},
  {id:4,naam:"België",continent:"Europa",hoofdstad:"Brussel",vlag:"🇧🇪",symbool:false,kleuren:["zwart","geel","rood"]},
  {id:5,naam:"Frankrijk",continent:"Europa",hoofdstad:"Parijs",vlag:"🇫🇷",symbool:false,kleuren:["blauw","wit","rood"]},
  {id:6,naam:"Spanje",continent:"Europa",hoofdstad:"Madrid",vlag:"🇪🇸",symbool:true,kleuren:["rood","geel"]},
  {id:7,naam:"Portugal",continent:"Europa",hoofdstad:"Lissabon",vlag:"🇵🇹",symbool:true,kleuren:["groen","rood"]},
  {id:8,naam:"Albanië",continent:"Europa",hoofdstad:"Tirana",vlag:"🇦🇱",symbool:true,kleuren:["rood","zwart"]},
  {id:9,naam:"Andorra",continent:"Europa",hoofdstad:"Andorra la Vella",vlag:"🇦🇩",symbool:true,kleuren:["blauw","geel","rood"]},
  {id:10,naam:"Armenië",continent:"Europa",hoofdstad:"Jerevan",vlag:"🇦🇲",symbool:false,kleuren:["rood","blauw","geel"]},
  {id:11,naam:"Azerbeidzjan",continent:"Europa",hoofdstad:"Bakoe",vlag:"🇦🇿",symbool:true,kleuren:["blauw","rood","groen"]},
  {id:12,naam:"Bosnië en Herzegovina",continent:"Europa",hoofdstad:"Sarajevo",vlag:"🇧🇦",symbool:false,kleuren:["blauw","geel","wit"]},
  {id:13,naam:"Bulgarije",continent:"Europa",hoofdstad:"Sofia",vlag:"🇧🇬",symbool:false,kleuren:["wit","groen","rood"]},
  {id:14,naam:"Cyprus",continent:"Europa",hoofdstad:"Nicosia",vlag:"🇨🇾",symbool:true,kleuren:["wit","oranje","groen"]},
  {id:15,naam:"Denemarken",continent:"Europa",hoofdstad:"Kopenhagen",vlag:"🇩🇰",symbool:false,kleuren:["rood","wit"]},
  {id:16,naam:"Estland",continent:"Europa",hoofdstad:"Tallinn",vlag:"🇪🇪",symbool:false,kleuren:["blauw","zwart","wit"]},
  {id:17,naam:"Finland",continent:"Europa",hoofdstad:"Helsinki",vlag:"🇫🇮",symbool:false,kleuren:["wit","blauw"]},
  {id:18,naam:"Georgië",continent:"Europa",hoofdstad:"Tbilisi",vlag:"🇬🇪",symbool:false,kleuren:["wit","rood"]},
  {id:19,naam:"Griekenland",continent:"Europa",hoofdstad:"Athene",vlag:"🇬🇷",symbool:false,kleuren:["blauw","wit"]},
  {id:20,naam:"Hongarije",continent:"Europa",hoofdstad:"Boedapest",vlag:"🇭🇺",symbool:false,kleuren:["rood","wit","groen"]},
  {id:21,naam:"Ierland",continent:"Europa",hoofdstad:"Dublin",vlag:"🇮🇪",symbool:false,kleuren:["groen","wit","oranje"]},
  {id:22,naam:"IJsland",continent:"Europa",hoofdstad:"Reykjavik",vlag:"🇮🇸",symbool:false,kleuren:["blauw","rood","wit"]},
  {id:23,naam:"Kazachstan",continent:"Europa",hoofdstad:"Astana",vlag:"🇰🇿",symbool:true,kleuren:["lichtblauw","geel"]},
  {id:24,naam:"Kosovo",continent:"Europa",hoofdstad:"Pristina",vlag:"🇽🇰",symbool:true,kleuren:["blauw","wit"]},
  {id:25,naam:"Kroatië",continent:"Europa",hoofdstad:"Zagreb",vlag:"🇭🇷",symbool:true,kleuren:["rood","wit","blauw"]},
  {id:26,naam:"Letland",continent:"Europa",hoofdstad:"Riga",vlag:"🇱🇻",symbool:false,kleuren:["rood","wit"]},
  {id:27,naam:"Liechtenstein",continent:"Europa",hoofdstad:"Vaduz",vlag:"🇱🇮",symbool:true,kleuren:["geel","blauw","rood"]},
  {id:28,naam:"Litouwen",continent:"Europa",hoofdstad:"Vilnius",vlag:"🇱🇹",symbool:false,kleuren:["geel","groen","rood"]},
  {id:29,naam:"Luxemburg",continent:"Europa",hoofdstad:"Luxemburg",vlag:"🇱🇺",symbool:false,kleuren:["rood","wit","lichtblauw"]},
  {id:30,naam:"Malta",continent:"Europa",hoofdstad:"Valletta",vlag:"🇲🇹",symbool:true,kleuren:["wit","rood"]},
  {id:31,naam:"Moldavië",continent:"Europa",hoofdstad:"Chisinau",vlag:"🇲🇩",symbool:true,kleuren:["blauw","geel","rood"]},
  {id:32,naam:"Monaco",continent:"Europa",hoofdstad:"Monaco-Ville",vlag:"🇲🇨",symbool:false,kleuren:["rood","wit"]},
  {id:33,naam:"Montenegro",continent:"Europa",hoofdstad:"Podgorica",vlag:"🇲🇪",symbool:true,kleuren:["rood","geel"]},
  {id:34,naam:"Noord-Macedonië",continent:"Europa",hoofdstad:"Skopje",vlag:"🇲🇰",symbool:false,kleuren:["rood","geel"]},
  {id:35,naam:"Noorwegen",continent:"Europa",hoofdstad:"Oslo",vlag:"🇳🇴",symbool:false,kleuren:["rood","blauw","wit"]},
  {id:36,naam:"Oekraïne",continent:"Europa",hoofdstad:"Kiev",vlag:"🇺🇦",symbool:false,kleuren:["blauw","geel"]},
  {id:37,naam:"Oostenrijk",continent:"Europa",hoofdstad:"Wenen",vlag:"🇦🇹",symbool:false,kleuren:["rood","wit"]},
  {id:38,naam:"Polen",continent:"Europa",hoofdstad:"Warschau",vlag:"🇵🇱",symbool:false,kleuren:["wit","rood"]},
  {id:39,naam:"Roemenië",continent:"Europa",hoofdstad:"Boekarest",vlag:"🇷🇴",symbool:false,kleuren:["blauw","geel","rood"]},
  {id:40,naam:"Rusland",continent:"Europa",hoofdstad:"Moskou",vlag:"🇷🇺",symbool:false,kleuren:["wit","blauw","rood"]},
  {id:41,naam:"San Marino",continent:"Europa",hoofdstad:"San Marino",vlag:"🇸🇲",symbool:true,kleuren:["wit","blauw"]},
  {id:42,naam:"Servië",continent:"Europa",hoofdstad:"Belgrado",vlag:"🇷🇸",symbool:true,kleuren:["rood","blauw","wit"]},
  {id:43,naam:"Slovenië",continent:"Europa",hoofdstad:"Ljubljana",vlag:"🇸🇮",symbool:true,kleuren:["wit","blauw","rood"]},
  {id:44,naam:"Slowakije",continent:"Europa",hoofdstad:"Bratislava",vlag:"🇸🇰",symbool:true,kleuren:["wit","blauw","rood"]},
  {id:45,naam:"Tsjechië",continent:"Europa",hoofdstad:"Praag",vlag:"🇨🇿",symbool:false,kleuren:["blauw","rood","wit"]},
  {id:46,naam:"Turkije",continent:"Europa",hoofdstad:"Ankara",vlag:"🇹🇷",symbool:true,kleuren:["rood","wit"]},
  {id:47,naam:"Vaticaanstad",continent:"Europa",hoofdstad:"Vaticaanstad",vlag:"🇻🇦",symbool:true,kleuren:["geel","wit"]},
  {id:48,naam:"Verenigd Koninkrijk",continent:"Europa",hoofdstad:"Londen",vlag:"🇬🇧",symbool:false,kleuren:["blauw","rood","wit"]},
  {id:49,naam:"Wit-Rusland",continent:"Europa",hoofdstad:"Minsk",vlag:"🇧🇾",symbool:true,kleuren:["rood","groen","wit"]},
  {id:50,naam:"Zweden",continent:"Europa",hoofdstad:"Stockholm",vlag:"🇸🇪",symbool:false,kleuren:["blauw","geel"]},
  {id:51,naam:"Zwitserland",continent:"Europa",hoofdstad:"Bern",vlag:"🇨🇭",symbool:false,kleuren:["rood","wit"]},
  {id:52,naam:"Antigua en Barbuda",continent:"Noord Amerika",hoofdstad:"Saint John's",vlag:"🇦🇬",symbool:true,kleuren:["meerkleurig"]},
  {id:53,naam:"Bahama's",continent:"Noord Amerika",hoofdstad:"Nassau",vlag:"🇧🇸",symbool:false,kleuren:["blauw","geel","zwart"]},
  {id:54,naam:"Barbados",continent:"Noord Amerika",hoofdstad:"Bridgetown",vlag:"🇧🇧",symbool:true,kleuren:["blauw","geel"]},
  {id:55,naam:"Belize",continent:"Noord Amerika",hoofdstad:"Belmopan",vlag:"🇧🇿",symbool:true,kleuren:["rood","blauw","wit"]},
  {id:56,naam:"Canada",continent:"Noord Amerika",hoofdstad:"Ottawa",vlag:"🇨🇦",symbool:true,kleuren:["rood","wit"]},
  {id:57,naam:"Costa Rica",continent:"Noord Amerika",hoofdstad:"San José",vlag:"🇨🇷",symbool:false,kleuren:["blauw","wit","rood"]},
  {id:58,naam:"Cuba",continent:"Noord Amerika",hoofdstad:"Havana",vlag:"🇨🇺",symbool:true,kleuren:["rood","blauw","wit"]},
  {id:59,naam:"Dominica",continent:"Noord Amerika",hoofdstad:"Roseau",vlag:"🇩🇲",symbool:true,kleuren:["meerkleurig"]},
  {id:60,naam:"Dominicaanse Republiek",continent:"Noord Amerika",hoofdstad:"Santo Domingo",vlag:"🇩🇴",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:61,naam:"El Salvador",continent:"Noord Amerika",hoofdstad:"San Salvador",vlag:"🇸🇻",symbool:true,kleuren:["blauw","wit"]},
  {id:62,naam:"Grenada",continent:"Noord Amerika",hoofdstad:"Saint George's",vlag:"🇬🇩",symbool:true,kleuren:["rood","geel","groen"]},
  {id:63,naam:"Guatemala",continent:"Noord Amerika",hoofdstad:"Guatemala-stad",vlag:"🇬🇹",symbool:true,kleuren:["lichtblauw","wit"]},
  {id:64,naam:"Haïti",continent:"Noord Amerika",hoofdstad:"Port-au-Prince",vlag:"🇭🇹",symbool:true,kleuren:["blauw","rood"]},
  {id:65,naam:"Honduras",continent:"Noord Amerika",hoofdstad:"Tegucigalpa",vlag:"🇭🇳",symbool:false,kleuren:["lichtblauw","wit"]},
  {id:66,naam:"Jamaica",continent:"Noord Amerika",hoofdstad:"Kingston",vlag:"🇯🇲",symbool:false,kleuren:["groen","zwart","geel"]},
  {id:67,naam:"Mexico",continent:"Noord Amerika",hoofdstad:"Mexico-Stad",vlag:"🇲🇽",symbool:true,kleuren:["groen","wit","rood"]},
  {id:68,naam:"Nicaragua",continent:"Noord Amerika",hoofdstad:"Managua",vlag:"🇳🇮",symbool:true,kleuren:["blauw","wit"]},
  {id:69,naam:"Panama",continent:"Noord Amerika",hoofdstad:"Panama-Stad",vlag:"🇵🇦",symbool:false,kleuren:["rood","blauw","wit"]},
  {id:70,naam:"Saint Kitts en Nevis",continent:"Noord Amerika",hoofdstad:"Basseterre",vlag:"🇰🇳",symbool:true,kleuren:["groen","zwart","rood"]},
  {id:71,naam:"Saint Lucia",continent:"Noord Amerika",hoofdstad:"Castries",vlag:"🇱🇨",symbool:true,kleuren:["lichtblauw","zwart","geel"]},
  {id:72,naam:"Saint Vincent en de Grenadines",continent:"Noord Amerika",hoofdstad:"Kingstown",vlag:"🇻🇨",symbool:true,kleuren:["blauw","geel","groen"]},
  {id:73,naam:"Trinidad en Tobago",continent:"Noord Amerika",hoofdstad:"Port of Spain",vlag:"🇹🇹",symbool:false,kleuren:["rood","zwart","wit"]},
  {id:74,naam:"Verenigde Staten",continent:"Noord Amerika",hoofdstad:"Washington D.C.",vlag:"🇺🇸",symbool:false,kleuren:["rood","wit","blauw"]},
  {id:75,naam:"Argentinië",continent:"Zuid Amerika",hoofdstad:"Buenos Aires",vlag:"🇦🇷",symbool:true,kleuren:["lichtblauw","wit","geel"]},
  {id:76,naam:"Bolivia",continent:"Zuid Amerika",hoofdstad:"Sucre",vlag:"🇧🇴",symbool:false,kleuren:["rood","geel","groen"]},
  {id:77,naam:"Brazilië",continent:"Zuid Amerika",hoofdstad:"Brasilia",vlag:"🇧🇷",symbool:true,kleuren:["groen","geel","blauw"]},
  {id:78,naam:"Chili",continent:"Zuid Amerika",hoofdstad:"Santiago",vlag:"🇨🇱",symbool:true,kleuren:["blauw","wit","rood"]},
  {id:79,naam:"Colombia",continent:"Zuid Amerika",hoofdstad:"Bogotá",vlag:"🇨🇴",symbool:false,kleuren:["geel","blauw","rood"]},
  {id:80,naam:"Ecuador",continent:"Zuid Amerika",hoofdstad:"Quito",vlag:"🇪🇨",symbool:true,kleuren:["geel","blauw","rood"]},
  {id:81,naam:"Frans Guyana",continent:"Zuid Amerika",hoofdstad:"Cayenne",vlag:"🇬🇫",symbool:false,kleuren:["blauw","wit","rood"]},
  {id:82,naam:"Guyana",continent:"Zuid Amerika",hoofdstad:"Georgetown",vlag:"🇬🇾",symbool:false,kleuren:["rood","geel","groen"]},
  {id:83,naam:"Paraguay",continent:"Zuid Amerika",hoofdstad:"Asunción",vlag:"🇵🇾",symbool:true,kleuren:["rood","wit","blauw"]},
  {id:84,naam:"Peru",continent:"Zuid Amerika",hoofdstad:"Lima",vlag:"🇵🇪",symbool:false,kleuren:["rood","wit"]},
  {id:85,naam:"Suriname",continent:"Zuid Amerika",hoofdstad:"Paramaribo",vlag:"🇸🇷",symbool:true,kleuren:["groen","rood","wit"]},
  {id:86,naam:"Uruguay",continent:"Zuid Amerika",hoofdstad:"Montevideo",vlag:"🇺🇾",symbool:true,kleuren:["geel","wit","blauw"]},
  {id:87,naam:"Venezuela",continent:"Zuid Amerika",hoofdstad:"Caracas",vlag:"🇻🇪",symbool:true,kleuren:["geel","blauw","rood"]},
  {id:88,naam:"Australië",continent:"Oceanië",hoofdstad:"Canberra",vlag:"🇦🇺",symbool:true,kleuren:["rood","blauw","wit"]},
  {id:89,naam:"Fiji",continent:"Oceanië",hoofdstad:"Suva",vlag:"🇫🇯",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:90,naam:"Kiribati",continent:"Oceanië",hoofdstad:"Zuid-Tarawa",vlag:"🇰🇮",symbool:true,kleuren:["meerkleurig"]},
  {id:91,naam:"Marshalleilanden",continent:"Oceanië",hoofdstad:"Majuro",vlag:"🇲🇭",symbool:true,kleuren:["wit","blauw","oranje"]},
  {id:92,naam:"Micronesië",continent:"Oceanië",hoofdstad:"Palikir",vlag:"🇫🇲",symbool:true,kleuren:["blauw","wit"]},
  {id:93,naam:"Nauru",continent:"Oceanië",hoofdstad:"Yaren",vlag:"🇳🇷",symbool:true,kleuren:["blauw","geel","wit"]},
  {id:94,naam:"Nieuw-Zeeland",continent:"Oceanië",hoofdstad:"Wellington",vlag:"🇳🇿",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:95,naam:"Palau",continent:"Oceanië",hoofdstad:"Ngerulmud",vlag:"🇵🇼",symbool:false,kleuren:["blauw","geel"]},
  {id:96,naam:"Papoea-Nieuw-Guinea",continent:"Oceanië",hoofdstad:"Port Moresby",vlag:"🇵🇬",symbool:true,kleuren:["zwart","rood","geel"]},
  {id:97,naam:"Salomonseilanden",continent:"Oceanië",hoofdstad:"Honiara",vlag:"🇸🇧",symbool:true,kleuren:["blauw","geel","groen"]},
  {id:98,naam:"Samoa",continent:"Oceanië",hoofdstad:"Apia",vlag:"🇼🇸",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:99,naam:"Tonga",continent:"Oceanië",hoofdstad:"Nuku'alofa",vlag:"🇹🇴",symbool:false,kleuren:["rood","wit"]},
  {id:100,naam:"Tuvalu",continent:"Oceanië",hoofdstad:"Funafuti",vlag:"🇹🇻",symbool:true,kleuren:["meerkleurig"]},
  {id:101,naam:"Vanuatu",continent:"Oceanië",hoofdstad:"Port Vila",vlag:"🇻🇺",symbool:true,kleuren:["rood","zwart","groen"]},
  {id:102,naam:"Afghanistan",continent:"Azië",hoofdstad:"Kabul",vlag:"🇦🇫",symbool:true,kleuren:["wit","zwart"]},
  {id:103,naam:"Bahrein",continent:"Azië",hoofdstad:"Manama",vlag:"🇧🇭",symbool:false,kleuren:["wit","rood"]},
  {id:104,naam:"Bangladesh",continent:"Azië",hoofdstad:"Dhaka",vlag:"🇧🇩",symbool:false,kleuren:["groen","rood"]},
  {id:105,naam:"Bhutan",continent:"Azië",hoofdstad:"Thimphu",vlag:"🇧🇹",symbool:true,kleuren:["geel","oranje","wit"]},
  {id:106,naam:"Brunei",continent:"Azië",hoofdstad:"Bandar Seri Begawan",vlag:"🇧🇳",symbool:true,kleuren:["geel","wit","zwart"]},
  {id:107,naam:"Cambodja",continent:"Azië",hoofdstad:"Phnom Penh",vlag:"🇰🇭",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:108,naam:"China",continent:"Azië",hoofdstad:"Peking",vlag:"🇨🇳",symbool:true,kleuren:["geel","rood"]},
  {id:109,naam:"Egypte",continent:"Azië",hoofdstad:"Cairo",vlag:"🇪🇬",symbool:true,kleuren:["rood","wit","zwart"]},
  {id:110,naam:"Filipijnen",continent:"Azië",hoofdstad:"Manilla",vlag:"🇵🇭",symbool:true,kleuren:["rood","wit","blauw"]},
  {id:111,naam:"India",continent:"Azië",hoofdstad:"New Delhi",vlag:"🇮🇳",symbool:true,kleuren:["oranje","wit","groen"]},
  {id:112,naam:"Indonesië",continent:"Azië",hoofdstad:"Jakarta",vlag:"🇮🇩",symbool:false,kleuren:["rood","wit"]},
  {id:113,naam:"Irak",continent:"Azië",hoofdstad:"Bagdad",vlag:"🇮🇶",symbool:true,kleuren:["rood","wit","zwart"]},
  {id:114,naam:"Iran",continent:"Azië",hoofdstad:"Teheran",vlag:"🇮🇷",symbool:true,kleuren:["groen","wit","rood"]},
  {id:115,naam:"Israël",continent:"Azië",hoofdstad:"Jeruzalem",vlag:"🇮🇱",symbool:true,kleuren:["blauw","wit"]},
  {id:116,naam:"Japan",continent:"Azië",hoofdstad:"Tokio",vlag:"🇯🇵",symbool:false,kleuren:["wit","rood"]},
  {id:117,naam:"Jemen",continent:"Azië",hoofdstad:"Sanaa",vlag:"🇾🇪",symbool:false,kleuren:["rood","wit","zwart"]},
  {id:118,naam:"Jordanië",continent:"Azië",hoofdstad:"Amman",vlag:"🇯🇴",symbool:true,kleuren:["meerkleurig"]},
  {id:119,naam:"Kirgizië",continent:"Azië",hoofdstad:"Bisjkek",vlag:"🇰🇬",symbool:true,kleuren:["rood","geel"]},
  {id:120,naam:"Koeweit",continent:"Azië",hoofdstad:"Koeweit-Stad",vlag:"🇰🇼",symbool:false,kleuren:["groen","wit","rood","zwart"]},
  {id:121,naam:"Laos",continent:"Azië",hoofdstad:"Vientiane",vlag:"🇱🇦",symbool:false,kleuren:["rood","blauw","wit"]},
  {id:122,naam:"Libanon",continent:"Azië",hoofdstad:"Beiroet",vlag:"🇱🇧",symbool:true,kleuren:["rood","wit","groen"]},
  {id:123,naam:"Malediven",continent:"Azië",hoofdstad:"Malé",vlag:"🇲🇻",symbool:true,kleuren:["rood","groen","wit"]},
  {id:124,naam:"Maleisië",continent:"Azië",hoofdstad:"Kuala Lumpur",vlag:"🇲🇾",symbool:true,kleuren:["meerkleurig"]},
  {id:125,naam:"Mongolië",continent:"Azië",hoofdstad:"Ulaanbaatar",vlag:"🇲🇳",symbool:true,kleuren:["rood","blauw","geel"]},
  {id:126,naam:"Myanmar",continent:"Azië",hoofdstad:"Naypyidaw",vlag:"🇲🇲",symbool:true,kleuren:["geel","groen","rood"]},
  {id:127,naam:"Nepal",continent:"Azië",hoofdstad:"Kathmandu",vlag:"🇳🇵",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:128,naam:"Noord-Korea",continent:"Azië",hoofdstad:"Pyongyang",vlag:"🇰🇵",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:129,naam:"Oezbekistan",continent:"Azië",hoofdstad:"Tasjkent",vlag:"🇺🇿",symbool:true,kleuren:["blauw","wit","groen"]},
  {id:130,naam:"Oman",continent:"Azië",hoofdstad:"Muscat",vlag:"🇴🇲",symbool:true,kleuren:["wit","rood","groen"]},
  {id:131,naam:"Oost-Timor",continent:"Azië",hoofdstad:"Dili",vlag:"🇹🇱",symbool:true,kleuren:["zwart","geel","rood"]},
  {id:132,naam:"Pakistan",continent:"Azië",hoofdstad:"Islamabad",vlag:"🇵🇰",symbool:true,kleuren:["wit","groen"]},
  {id:133,naam:"Palestina",continent:"Azië",hoofdstad:"Ramallah",vlag:"🇵🇸",symbool:false,kleuren:["meerkleurig"]},
  {id:134,naam:"Qatar",continent:"Azië",hoofdstad:"Doha",vlag:"🇶🇦",symbool:false,kleuren:["rood","wit"]},
  {id:135,naam:"Saoedi-Arabië",continent:"Azië",hoofdstad:"Riyad",vlag:"🇸🇦",symbool:true,kleuren:["groen","wit"]},
  {id:136,naam:"Singapore",continent:"Azië",hoofdstad:"Singapore",vlag:"🇸🇬",symbool:true,kleuren:["rood","wit"]},
  {id:137,naam:"Sri Lanka",continent:"Azië",hoofdstad:"Sri Jayewardenepura Kotte",vlag:"🇱🇰",symbool:true,kleuren:["meerkleurig"]},
  {id:138,naam:"Syrië",continent:"Azië",hoofdstad:"Damascus",vlag:"🇸🇾",symbool:true,kleuren:["rood","wit","zwart"]},
  {id:139,naam:"Tadzjikistan",continent:"Azië",hoofdstad:"Dusjanbe",vlag:"🇹🇯",symbool:true,kleuren:["rood","wit","groen"]},
  {id:140,naam:"Thailand",continent:"Azië",hoofdstad:"Bangkok",vlag:"🇹🇭",symbool:false,kleuren:["wit","blauw","rood"]},
  {id:141,naam:"Turkmenistan",continent:"Azië",hoofdstad:"Asjchabad",vlag:"🇹🇲",symbool:true,kleuren:["groen","wit","rood"]},
  {id:142,naam:"VAE",continent:"Azië",hoofdstad:"Abu Dhabi",vlag:"🇦🇪",symbool:false,kleuren:["meerkleurig"]},
  {id:143,naam:"Vietnam",continent:"Azië",hoofdstad:"Hanoi",vlag:"🇻🇳",symbool:true,kleuren:["geel","rood"]},
  {id:144,naam:"Zuid-Korea",continent:"Azië",hoofdstad:"Seoel",vlag:"🇰🇷",symbool:true,kleuren:["wit","blauw","rood"]},
  {id:145,naam:"Algerije",continent:"Afrika",hoofdstad:"Algiers",vlag:"🇩🇿",symbool:true,kleuren:["groen","rood","wit"]},
  {id:146,naam:"Angola",continent:"Afrika",hoofdstad:"Luanda",vlag:"🇦🇴",symbool:true,kleuren:["rood","geel","zwart"]},
  {id:147,naam:"Benin",continent:"Afrika",hoofdstad:"Porto-Novo",vlag:"🇧🇯",symbool:false,kleuren:["groen","rood","geel"]},
  {id:148,naam:"Botswana",continent:"Afrika",hoofdstad:"Gaborone",vlag:"🇧🇼",symbool:false,kleuren:["blauw","wit","zwart"]},
  {id:149,naam:"Burkina Faso",continent:"Afrika",hoofdstad:"Ouagadougou",vlag:"🇧🇫",symbool:true,kleuren:["rood","geel","groen"]},
  {id:150,naam:"Burundi",continent:"Afrika",hoofdstad:"Gitega",vlag:"🇧🇮",symbool:true,kleuren:["groen","rood","wit"]},
  {id:151,naam:"Centraal-Afrikaanse Republiek",continent:"Afrika",hoofdstad:"Bangui",vlag:"🇨🇫",symbool:true,kleuren:["meerkleurig"]},
  {id:152,naam:"Comoren",continent:"Afrika",hoofdstad:"Moroni",vlag:"🇰🇲",symbool:true,kleuren:["meerkleurig"]},
  {id:153,naam:"Congo-Brazzaville",continent:"Afrika",hoofdstad:"Brazzaville",vlag:"🇨🇬",symbool:false,kleuren:["groen","geel","rood"]},
  {id:154,naam:"Congo-Kinshasa",continent:"Afrika",hoofdstad:"Kinshasa",vlag:"🇨🇩",symbool:true,kleuren:["blauw","geel","rood"]},
  {id:155,naam:"Djibouti",continent:"Afrika",hoofdstad:"Djibouti",vlag:"🇩🇯",symbool:true,kleuren:["blauw","wit","groen"]},
  {id:156,naam:"Equatoriaal-Guinea",continent:"Afrika",hoofdstad:"Malabo",vlag:"🇬🇶",symbool:true,kleuren:["meerkleurig"]},
  {id:157,naam:"Eritrea",continent:"Afrika",hoofdstad:"Asmara",vlag:"🇪🇷",symbool:true,kleuren:["rood","groen","blauw"]},
  {id:158,naam:"Ethiopië",continent:"Afrika",hoofdstad:"Addis Abeba",vlag:"🇪🇹",symbool:true,kleuren:["groen","geel","rood"]},
  {id:159,naam:"Gabon",continent:"Afrika",hoofdstad:"Libreville",vlag:"🇬🇦",symbool:false,kleuren:["groen","geel","blauw"]},
  {id:160,naam:"Gambia",continent:"Afrika",hoofdstad:"Banjul",vlag:"🇬🇲",symbool:false,kleuren:["rood","blauw","groen"]},
  {id:161,naam:"Ghana",continent:"Afrika",hoofdstad:"Accra",vlag:"🇬🇭",symbool:true,kleuren:["rood","geel","groen"]},
  {id:162,naam:"Guinee",continent:"Afrika",hoofdstad:"Conakry",vlag:"🇬🇳",symbool:false,kleuren:["rood","geel","groen"]},
  {id:163,naam:"Guinee-Bissau",continent:"Afrika",hoofdstad:"Bissau",vlag:"🇬🇼",symbool:true,kleuren:["rood","geel","groen"]},
  {id:164,naam:"Ivoorkust",continent:"Afrika",hoofdstad:"Yamoussoukro",vlag:"🇨🇮",symbool:false,kleuren:["oranje","wit","groen"]},
  {id:165,naam:"Kaapverdië",continent:"Afrika",hoofdstad:"Praia",vlag:"🇨🇻",symbool:true,kleuren:["blauw","wit","rood"]},
  {id:166,naam:"Kenia",continent:"Afrika",hoofdstad:"Nairobi",vlag:"🇰🇪",symbool:true,kleuren:["zwart","rood","groen"]},
  {id:167,naam:"Liberia",continent:"Afrika",hoofdstad:"Monrovia",vlag:"🇱🇷",symbool:true,kleuren:["rood","wit","blauw"]},
  {id:168,naam:"Libië",continent:"Afrika",hoofdstad:"Tripoli",vlag:"🇱🇾",symbool:true,kleuren:["rood","zwart","groen"]},
  {id:169,naam:"Madagaskar",continent:"Afrika",hoofdstad:"Antananarivo",vlag:"🇲🇬",symbool:false,kleuren:["wit","rood","groen"]},
  {id:170,naam:"Malawi",continent:"Afrika",hoofdstad:"Lilongwe",vlag:"🇲🇼",symbool:true,kleuren:["zwart","rood","groen"]},
  {id:171,naam:"Mali",continent:"Afrika",hoofdstad:"Bamako",vlag:"🇲🇱",symbool:false,kleuren:["groen","geel","rood"]},
  {id:172,naam:"Marokko",continent:"Afrika",hoofdstad:"Rabat",vlag:"🇲🇦",symbool:true,kleuren:["rood","groen"]},
  {id:173,naam:"Mozambique",continent:"Afrika",hoofdstad:"Maputo",vlag:"🇲🇿",symbool:true,kleuren:["meerkleurig"]},
  {id:174,naam:"Niger",continent:"Afrika",hoofdstad:"Niamey",vlag:"🇳🇪",symbool:true,kleuren:["oranje","wit","groen"]},
  {id:175,naam:"Nigeria",continent:"Afrika",hoofdstad:"Abuja",vlag:"🇳🇬",symbool:false,kleuren:["groen","wit"]},
  {id:176,naam:"Oeganda",continent:"Afrika",hoofdstad:"Kampala",vlag:"🇺🇬",symbool:true,kleuren:["geel","rood","zwart"]},
  {id:177,naam:"Rwanda",continent:"Afrika",hoofdstad:"Kigali",vlag:"🇷🇼",symbool:true,kleuren:["blauw","geel","groen"]},
  {id:178,naam:"Sao Tomé en Príncipe",continent:"Afrika",hoofdstad:"São Tomé",vlag:"🇸🇹",symbool:true,kleuren:["rood","groen","geel"]},
  {id:179,naam:"Senegal",continent:"Afrika",hoofdstad:"Dakar",vlag:"🇸🇳",symbool:true,kleuren:["groen","geel","rood"]},
  {id:180,naam:"Sierra Leone",continent:"Afrika",hoofdstad:"Freetown",vlag:"🇸🇱",symbool:false,kleuren:["groen","wit","blauw"]},
  {id:181,naam:"Soedan",continent:"Afrika",hoofdstad:"Khartoem",vlag:"🇸🇩",symbool:true,kleuren:["meerkleurig"]},
  {id:182,naam:"Somalië",continent:"Afrika",hoofdstad:"Mogadishu",vlag:"🇸🇴",symbool:true,kleuren:["blauw","wit"]},
  {id:183,naam:"Tanzania",continent:"Afrika",hoofdstad:"Dodoma",vlag:"🇹🇿",symbool:false,kleuren:["groen","zwart","blauw"]},
  {id:184,naam:"Togo",continent:"Afrika",hoofdstad:"Lomé",vlag:"🇹🇬",symbool:true,kleuren:["rood","groen","geel"]},
  {id:185,naam:"Tsjaad",continent:"Afrika",hoofdstad:"N'Djamena",vlag:"🇹🇩",symbool:false,kleuren:["blauw","geel","rood"]},
  {id:186,naam:"Tunesië",continent:"Afrika",hoofdstad:"Tunis",vlag:"🇹🇳",symbool:true,kleuren:["rood","wit"]},
  {id:187,naam:"Zambia",continent:"Afrika",hoofdstad:"Lusaka",vlag:"🇿🇲",symbool:true,kleuren:["meerkleurig"]},
  {id:188,naam:"Zimbabwe",continent:"Afrika",hoofdstad:"Harare",vlag:"🇿🇼",symbool:true,kleuren:["meerkleurig"]},
  {id:189,naam:"Zuid-Afrika",continent:"Afrika",hoofdstad:"Kaapstad",vlag:"🇿🇦",symbool:false,kleuren:["meerkleurig"]},
  {id:190,naam:"Zuid-Soedan",continent:"Afrika",hoofdstad:"Juba",vlag:"🇸🇸",symbool:true,kleuren:["meerkleurig"]},
];

const CONTINENTEN = ["Alle", ...new Set(FLAGS.map(f => f.continent))];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getOptions(correct, all) {
  const pool = all.filter(f => f.id !== correct.id);
  return shuffle([correct, ...shuffle(pool).slice(0, 3)]);
}

function calcPoints(timeLeft) {
  return Math.round(10 + (timeLeft / 20) * 90);
}

// ── STORAGE (Vercel Blob via /api/scores) ──
async function fetchLeaderboard() {
  try {
    const res = await fetch("/api/scores");
    if (!res.ok) return { solo: [], duel: [] };
    return await res.json();
  } catch { return { solo: [], duel: [] }; }
}

async function saveRecord(name, score, mode) {
  // Always save locally too
  try {
    const key = "flagquiz_local";
    const local = JSON.parse(localStorage.getItem(key) || "[]");
    local.push({ name, score, mode, date: new Date().toLocaleDateString() });
    localStorage.setItem(key, JSON.stringify(local.slice(-50)));
  } catch {}
  // Save globally via API
  try {
    await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, score, mode }),
    });
  } catch {}
}

// ── SEO HEAD UPDATER ──
function useSeoHead(lang, t) {
  useEffect(() => {
    const langMeta = getLangMeta(lang);
    const url = `https://flagquiz.io${langMeta.path}`;
    const fullTitle = `${t.siteTitle} – ${t.tagline}`;

    // Core
    document.title = fullTitle;
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang;
    document.documentElement.dir = langMeta.rtl ? "rtl" : "ltr";

    // Standard meta
    setMeta("description", t.siteDesc);
    setMeta("keywords", t.siteKeywords);
    setMeta("language", langMeta.name);
    setMeta("robots", "index, follow, max-snippet:-1, max-image-preview:large");

    // Canonical
    setAttr('link[rel="canonical"]', "href", url);

    // Open Graph
    setOgMeta("og:url",         url);
    setOgMeta("og:title",       fullTitle);
    setOgMeta("og:description", t.siteDesc);
    setOgMeta("og:locale",      langMeta.locale);
    setOgMeta("og:site_name",   t.siteTitle);
    setOgMeta("og:type",        "website");

    // Twitter
    setNameMeta("twitter:title",       fullTitle);
    setNameMeta("twitter:description", t.siteDesc);
    setNameMeta("twitter:card",        "summary_large_image");

    // Hreflang — remove old, add fresh set
    document.querySelectorAll('link[hreflang]').forEach(el => el.remove());
    LANGUAGES.forEach(l => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = l.code === "zh" ? "zh-Hans" : l.code;
      link.href = `https://flagquiz.io${l.path}`;
      document.head.appendChild(link);
    });
    const xdef = document.createElement("link");
    xdef.rel = "alternate"; xdef.hreflang = "x-default"; xdef.href = "https://flagquiz.io/";
    document.head.appendChild(xdef);

    // Per-language JSON-LD (update description in existing script tags)
    document.querySelectorAll('script[data-dynamic-ld]').forEach(el => el.remove());
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.setAttribute("data-dynamic-ld", "true");
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      "url": url,
      "name": fullTitle,
      "description": t.siteDesc,
      "inLanguage": lang === "zh" ? "zh-Hans" : lang,
      "isPartOf": { "@id": "https://flagquiz.io/#website" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [{ "@type": "ListItem", "position": 1, "name": t.siteTitle, "item": url }]
      }
    });
    document.head.appendChild(ld);
  }, [lang, t]);
}

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
  el.content = content;
}
function setNameMeta(name, content) { setMeta(name, content); }
function setOgMeta(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute("property", property); document.head.appendChild(el); }
  el.content = content;
}
function setAttr(selector, attr, val) {
  const el = document.querySelector(selector);
  if (el) el[attr] = val;
}

// ── CONFETTI ──
function Confetti() {
  const pieces = Array.from({length: 70}, (_, i) => ({
    id: i, x: Math.random() * 100, delay: Math.random() * 2.5,
    duration: 2 + Math.random() * 2.5,
    color: ["#e94560","#f1c40f","#27ae60","#4a90d9","#e67e22","#9b59b6","#fff"][Math.floor(Math.random()*7)],
    size: 5 + Math.random() * 10,
  }));
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:200,overflow:"hidden"}}>
      <style>{`@keyframes fall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}`}</style>
      {pieces.map(p => (
        <div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:0,width:p.size,height:p.size,background:p.color,borderRadius:p.size>10?"50%":"2px",animation:`fall ${p.duration}s ${p.delay}s ease-in forwards`}}/>
      ))}
    </div>
  );
}

// ── TIMER RING ──
function TimerRing({ timeLeft, maxTime = 20 }) {
  const r = 28, circ = 2 * Math.PI * r;
  const pct = timeLeft / maxTime;
  const color = pct > 0.5 ? "#27ae60" : pct > 0.25 ? "#f1c40f" : "#e94560";
  return (
    <div style={{position:"relative",width:72,height:72,flexShrink:0}}>
      <svg width="72" height="72" style={{transform:"rotate(-90deg)"}}>
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5"/>
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
          style={{transition:"stroke-dashoffset 0.9s linear,stroke .3s"}}/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"var(--font-lg)",fontWeight:800,color}}>{timeLeft}</div>
    </div>
  );
}

// ── LIVES ──
function Lives({count}) {
  return <span>{[0,1].map(i=><span key={i} style={{fontSize:"var(--font-lg)",opacity:i<count?1:0.2}}>{i<count?"❤️":"🖤"}</span>)}</span>;
}

// ── THEME TOGGLE ──
function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
      <span style={{fontSize:"var(--font-xs)"}}>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}

// ── LANGUAGE SWITCHER ──
function LangSwitcher({ currentLang }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const current = getLangMeta(currentLang);
  return (
    <div style={{position:"relative"}}>
      <button onClick={() => setOpen(o => !o)}
        style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",borderRadius:8,border:"1px solid var(--border)",background:"var(--btn-default-bg)",color:"var(--text-primary)",cursor:"pointer",fontSize:"var(--font-sm)",fontWeight:600}}>
        <span>{current.flag}</span>
        <span style={{maxWidth:60,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{current.name}</span>
        <span style={{fontSize:"var(--font-xs)",opacity:.6}}>{open?"▲":"▼"}</span>
      </button>
      {open && (
        <>
          <div style={{position:"fixed",inset:0,zIndex:49}} onClick={() => setOpen(false)}/>
          <div style={{position:"absolute",right:0,top:"calc(100% + 6px)",background:"var(--modal-bg)",border:"1px solid var(--border)",borderRadius:10,overflow:"hidden",zIndex:50,minWidth:160,boxShadow:"0 8px 32px rgba(0,0,0,.5)"}}>
            {LANGUAGES.map(l => (
              <button key={l.code}
                onClick={() => { navigate(l.path); setOpen(false); }}
                style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 16px",border:"none",background:l.code===currentLang?"rgba(74,144,217,0.2)":"transparent",color:l.code===currentLang?"#4a90d9":"var(--text-secondary)",cursor:"pointer",fontSize:"var(--font-sm)",fontWeight:l.code===currentLang?700:400,textAlign:"left"}}>
                <span style={{fontSize:"var(--font-base)"}}>{l.flag}</span>
                <span>{l.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── LEADERBOARD ──
function Leaderboard({ t, onClose }) {
  const [data, setData]       = useState({ solo: [], duel: [] });
  const [loading, setLoading] = useState(true);
  const [tab, setTab]         = useState("solo");

  useEffect(() => {
    fetchLeaderboard().then(d => { setData(d); setLoading(false); });
  }, []);

  const list = data[tab].slice(0, 10);
  const medal = ["🥇","🥈","🥉"];

  return (
    <div style={{position:"fixed",inset:0,background:"var(--bg-overlay)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:150,padding:20}}>
      <div style={{background:"var(--modal-bg)",borderRadius:20,padding:32,maxWidth:480,width:"100%",border:"1px solid var(--border)"}}>
        <h2 style={{margin:"0 0 4px",fontSize:"var(--font-xl)",textAlign:"center"}}>🏆 {t.leaderboardTitle}</h2>
        {USE_SUPABASE
          ? <p style={{textAlign:"center",color:"var(--text-secondary)",fontSize:"var(--font-xs)",margin:"0 0 20px"}}>Global leaderboard</p>
          : <p style={{textAlign:"center",color:"var(--accent-yellow)",fontSize:"var(--font-xs)",margin:"0 0 20px"}}>⚠ Local only — add Supabase to go global</p>
        }

        {/* Tabs */}
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          {[["solo", t.soloTab], ["duel", t.duelTab]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              style={{flex:1,padding:"9px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:"var(--font-sm)",
                background: tab===key ? "var(--accent-red)" : "var(--btn-default-bg)",
                color: tab===key ? "#fff" : "var(--text-secondary)"}}>
              {label}
            </button>
          ))}
        </div>

        {/* Rows */}
        {loading ? (
          <div style={{textAlign:"center",padding:"32px 0",color:"var(--text-secondary)"}}>Loading…</div>
        ) : list.length === 0 ? (
          <div style={{textAlign:"center",padding:"32px 0",color:"var(--text-muted)",fontSize:"var(--font-sm)"}}>{t.noScores}</div>
        ) : (
          list.map((r, i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid var(--border)"}}>
              <span style={{width:28,textAlign:"center",fontSize:i<3?"18px":"var(--font-sm)",fontWeight:700,color:"var(--text-muted)"}}>
                {medal[i] || `${i+1}.`}
              </span>
              <span style={{flex:1,fontWeight:600,fontSize:"var(--font-sm)"}}>{r.name}</span>
              <span style={{fontWeight:800,color:"var(--accent-yellow)",fontSize:"var(--font-base)"}}>{r.score.toLocaleString()}</span>
              <span style={{color:"var(--text-muted)",fontSize:"var(--font-xs)"}}>{r.date}</span>
            </div>
          ))
        )}

        <button onClick={onClose} style={{marginTop:24,width:"100%",padding:"12px",borderRadius:10,border:"none",background:"var(--btn-default-bg)",color:"var(--text-primary)",fontSize:"var(--font-sm)",fontWeight:600,cursor:"pointer"}}>{t.close}</button>
      </div>
    </div>
  );
}

// ── SAVE SCORE MODAL ──
function SaveScore({ score, mode, lang, t, onSave, onSkip }) {
  const [name, setName] = useState("");
  return (
    <div style={{position:"fixed",inset:0,background:"var(--bg-overlay)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:160,padding:20}}>
      <div style={{background:"var(--modal-bg)",borderRadius:20,padding:32,maxWidth:400,width:"100%",border:"1px solid var(--border)",textAlign:"center"}}>
        <div style={{fontSize:52,marginBottom:8}}>🎉</div>
        <h2 style={{margin:"0 0 4px",fontSize:"var(--font-xl)"}}>{t.saveTitle}</h2>
        <p style={{color:"var(--text-secondary)",marginBottom:20,fontSize:"var(--font-base)"}}>{t.saveDesc}</p>
        <div style={{fontSize:"var(--font-2xl)",fontWeight:800,color:"var(--accent-yellow)",marginBottom:20}}>{score.toLocaleString()} {t.pts}</div>
        <input autoFocus
          style={{width:"100%",padding:"12px 14px",borderRadius:10,border:"1.5px solid var(--border)",background:"var(--btn-default-bg)",color:"var(--text-primary)",fontSize:"var(--font-base)",outline:"none",marginBottom:14,boxSizing:"border-box"}}
          placeholder={t.namePlaceholder} value={name} onChange={e=>setName(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&name.trim()&&onSave(name.trim())}/>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>name.trim()&&onSave(name.trim())} disabled={!name.trim()}
            style={{flex:1,padding:"12px",borderRadius:10,border:"none",background:name.trim()?"#e94560":"rgba(255,255,255,0.08)",color:"var(--text-primary)",fontSize:"var(--font-base)",fontWeight:700,cursor:name.trim()?"pointer":"default"}}>
            {t.save}
          </button>
          <button onClick={onSkip} style={{padding:"12px 18px",borderRadius:10,border:"none",background:"var(--bg-input)",color:"var(--text-secondary)",fontSize:"var(--font-sm)",cursor:"pointer"}}>{t.skip}</button>
        </div>
      </div>
    </div>
  );
}

// ── COLOR TAG ──
function ColorTag({ c }) {
  const m={rood:"#e94560",blauw:"#4a90d9",groen:"#27ae60",geel:"#f1c40f",wit:"#ecf0f1",zwart:"#34495e",oranje:"#e67e22",lichtblauw:"#5dade2",meerkleurig:"#9b59b6",
    red:"#e94560",blue:"#4a90d9",green:"#27ae60",yellow:"#f1c40f",white:"#ecf0f1",black:"#34495e",orange:"#e67e22"};
  return <span style={{display:"inline-block",padding:"2px 10px",borderRadius:20,fontSize:"var(--font-xs)",fontWeight:600,background:m[c]||"var(--text-muted)",color:["wit","geel","lichtblauw","white","yellow"].includes(c)?"#222":"#fff",margin:"2px"}}>{c}</span>;
}

// ── MAIN APP ──
export default function App({ langCode }) {
  const t = getLang(langCode);
  const langMeta = getLangMeta(langCode);
  useSeoHead(langCode, t);

  const [theme, setTheme] = useState(() => localStorage.getItem("fq_theme") || "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("fq_theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme(th => th === "dark" ? "light" : "dark");

  const [mode, setMode] = useState("home");
  const [continent, setContinent] = useState("Alle");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [topScores, setTopScores] = useState([]);
  const [showSave, setShowSave] = useState(false);
  const [pendingScore, setPendingScore] = useState(null);
  const [pendingMode, setPendingMode] = useState(null);

  // Load top scores for mini leaderboard on home screen
  useEffect(() => {
    fetchLeaderboard().then(d => {
      const all = [...d.solo, ...d.duel].sort((a,b) => b.score - a.score).slice(0, 5);
      setTopScores(all);
    });
  }, []);

  // ── SOLO STATE ──
  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [timedOut, setTimedOut] = useState(false);
  const [lastPoints, setLastPoints] = useState(null);

  // ── DUEL STATE ──
  const [p1Name, setP1Name] = useState("");
  const [p2Name, setP2Name] = useState("");
  const [duelList, setDuelList] = useState([]);
  const [duelIndex, setDuelIndex] = useState(0);
  const [duelOptions, setDuelOptions] = useState([]);
  const [duelAnswer, setDuelAnswer] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [lives, setLives] = useState([2, 2]);
  const [duelScores, setDuelScores] = useState([0, 0]);
  const [duelDone, setDuelDone] = useState(false);
  const [winner, setWinner] = useState(null);
  const [duelTimeLeft, setDuelTimeLeft] = useState(20);
  const [duelTimedOut, setDuelTimedOut] = useState(false);
  const [duelLastPoints, setDuelLastPoints] = useState(null);

  const timerRef = useRef(null);
  const duelTimerRef = useRef(null);

  const pool = useMemo(() =>
    continent === "Alle" ? FLAGS : FLAGS.filter(f => f.continent === continent), [continent]);

  const filtered = useMemo(() => FLAGS.filter(f => {
    const matchC = continent === "Alle" || f.continent === continent;
    const matchS = f.naam.toLowerCase().includes(search.toLowerCase());
    return matchC && matchS;
  }), [continent, search]);

  // ── SOLO TIMER ──
  useEffect(() => {
    if (mode !== "quiz" || quizAnswer !== null || timedOut || quizList.length === 0) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setTimedOut(true); setQuizAnswer(-1); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [mode, quizIndex, quizList.length, quizAnswer, timedOut]);

  // ── AUTO ADVANCE ──
  useEffect(() => {
    if (quizAnswer === null || quizList.length === 0 || quizAnswer !== quizList[quizIndex]?.id) return;
    setCountdown(3);
    const iv = setInterval(() => setCountdown(c => c > 1 ? c - 1 : null), 1000);
    const to = setTimeout(nextQuestion, 3000);
    return () => { clearInterval(iv); clearTimeout(to); };
  }, [quizAnswer, quizIndex, quizList]);

  // ── DUEL TIMER ──
  useEffect(() => {
    if (mode !== "duel" || duelAnswer !== null || duelTimedOut || duelList.length === 0 || duelDone) return;
    clearInterval(duelTimerRef.current);
    duelTimerRef.current = setInterval(() => {
      setDuelTimeLeft(t => {
        if (t <= 1) {
          clearInterval(duelTimerRef.current);
          setDuelTimedOut(true);
          setDuelAnswer(-1);
          setLives(prev => {
            const nl = [...prev]; nl[currentPlayer]--;
            if (nl[currentPlayer] <= 0) { setWinner(currentPlayer === 0 ? 1 : 0); setDuelDone(true); }
            return nl;
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(duelTimerRef.current);
  }, [mode, duelIndex, duelAnswer, duelTimedOut, duelList.length, duelDone, currentPlayer]);

  function nextQuestion() {
    clearInterval(timerRef.current);
    setCountdown(null); setTimedOut(false); setLastPoints(null);
    setQuizIndex(prev => {
      const next = prev + 1;
      if (next >= quizList.length) { setQuizDone(true); return prev; }
      setQuizOptions(getOptions(quizList[next], pool));
      setQuizAnswer(null); setTimeLeft(20);
      return next;
    });
  }

  function startQuiz() {
    clearInterval(timerRef.current);
    const list = shuffle(pool).slice(0, 20);
    setQuizList(list); setQuizIndex(0); setQuizOptions(getOptions(list[0], pool));
    setQuizAnswer(null); setScore(0); setQuizDone(false);
    setCountdown(null); setTimeLeft(20); setTimedOut(false); setLastPoints(null);
    setMode("quiz");
  }

  function handleAnswer(flag) {
    if (quizAnswer !== null) return;
    clearInterval(timerRef.current);
    const correct = flag.id === quizList[quizIndex].id;
    setQuizAnswer(flag.id);
    if (correct) { const pts = calcPoints(timeLeft); setLastPoints(pts); setScore(s => s + pts); }
    else setLastPoints(0);
  }

  function startDuel() {
    clearInterval(duelTimerRef.current);
    const list = shuffle(FLAGS);
    setDuelList(list); setDuelIndex(0); setDuelOptions(getOptions(list[0], FLAGS));
    setDuelAnswer(null); setCurrentPlayer(0); setLives([2,2]); setDuelScores([0,0]);
    setDuelDone(false); setWinner(null); setDuelTimeLeft(20); setDuelTimedOut(false); setDuelLastPoints(null);
    setMode("duel");
  }

  function handleDuelAnswer(flag) {
    if (duelAnswer !== null) return;
    clearInterval(duelTimerRef.current);
    const correct = flag.id === duelList[duelIndex].id;
    setDuelAnswer(flag.id);
    const newLives = [...lives], newScores = [...duelScores];
    if (correct) { const pts = calcPoints(duelTimeLeft); setDuelLastPoints(pts); newScores[currentPlayer] += pts; setDuelScores(newScores); }
    else { setDuelLastPoints(0); newLives[currentPlayer]--; setLives(newLives); if (newLives[currentPlayer] <= 0) { setWinner(currentPlayer===0?1:0); setDuelDone(true); } }
  }

  function nextDuelQuestion() {
    clearInterval(duelTimerRef.current);
    setDuelTimedOut(false); setDuelLastPoints(null);
    const next = duelIndex + 1;
    setDuelIndex(next); setDuelOptions(getOptions(duelList[next], FLAGS));
    setDuelAnswer(null); setDuelTimeLeft(20);
    setCurrentPlayer(p => p === 0 ? 1 : 0);
  }

  function finishAndSave(finalScore, modeLabel) {
    setPendingScore(finalScore); setPendingMode(modeLabel); setShowSave(true);
  }

  function handleSave(name) {
    saveRecord(name, pendingScore, pendingMode);
    // Refresh mini leaderboard
    fetchLeaderboard().then(d => {
      const all = [...d.solo, ...d.duel].sort((a,b) => b.score - a.score).slice(0, 5);
      setTopScores(all);
    });
    setShowSave(false);
  }

  const names = [p1Name || `${t.player1?.split(" ")[0]} 1`, p2Name || `${t.player1?.split(" ")[0]} 2`];
  const playerColors = ["var(--p1)","var(--p2)"];
  const isRtl = langMeta.rtl;

  const st = {
    app: { minHeight:"100vh", background:"var(--bg-page)", color:"var(--text-primary)", fontFamily:"'Segoe UI',system-ui,sans-serif", direction: isRtl?"rtl":"ltr" },
    header: { padding:"14px 24px", borderBottom:"1px solid var(--border)", background:"var(--bg-surface)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 },
    logo: { fontSize:"var(--font-xl)", fontWeight:900, cursor:"pointer", background:"linear-gradient(90deg,var(--accent-red),var(--accent-blue))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:-0.5 },
    btn: (a) => ({ padding:"9px 18px", borderRadius:"var(--radius-sm)", border: a?"none":"1px solid var(--border)", cursor:"pointer", fontWeight:600, fontSize:"var(--font-sm)", background: a?"var(--accent-red)":"var(--btn-default-bg)", color: a?"var(--text-on-accent)":"var(--btn-default-text)", transition:"all .2s", whiteSpace:"nowrap", minHeight:38 }),
    input: { padding:"8px 12px", borderRadius:8, border:"1.5px solid var(--border)", background:"var(--bg-input)", color:"var(--text-primary)", fontSize:"var(--font-sm)", outline:"none", width:180 },
    select: { padding:"8px 12px", borderRadius:8, border:"1.5px solid var(--border)", background:"var(--bg-input)", color:"var(--text-primary)", fontSize:"var(--font-sm)", outline:"none" },
    grid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))", gap:14, padding:"0 24px 32px" },
    card: { background:"var(--card-bg)", borderRadius:12, padding:14, cursor:"pointer", border:"1px solid var(--card-border)", transition:"all .2s" },
    modal: { position:"fixed", inset:0, background:"var(--bg-overlay)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, padding:20 },
    box: { background:"var(--modal-bg)", borderRadius:16, padding:28, maxWidth:420, width:"100%", border:"1px solid var(--border)" },
  };

  const CONTINENTS_LABELS = {
    "Alle": { en:"All", nl:"Alle", de:"Alle", fr:"Tous", es:"Todos", pt:"Todos", it:"Tutti", tr:"Hepsi", ar:"الكل", zh:"全部", hi:"सभी" },
    "Europa":      { en:"Europe", nl:"Europa", de:"Europa", fr:"Europe", es:"Europa", pt:"Europa", it:"Europa", tr:"Avrupa", ar:"أوروبا", zh:"欧洲", hi:"यूरोप" },
    "Noord Amerika":{ en:"North America", nl:"Noord Amerika", de:"Nordamerika", fr:"Amérique du Nord", es:"América del Norte", pt:"América do Norte", it:"America del Nord", tr:"Kuzey Amerika", ar:"أمريكا الشمالية", zh:"北美洲", hi:"उत्तर अमेरिका" },
    "Zuid Amerika": { en:"South America", nl:"Zuid Amerika", de:"Südamerika", fr:"Amérique du Sud", es:"América del Sur", pt:"América do Sul", it:"America del Sud", tr:"Güney Amerika", ar:"أمريكا الجنوبية", zh:"南美洲", hi:"दक्षिण अमेरिका" },
    "Azië":        { en:"Asia", nl:"Azië", de:"Asien", fr:"Asie", es:"Asia", pt:"Ásia", it:"Asia", tr:"Asya", ar:"آسيا", zh:"亚洲", hi:"एशिया" },
    "Afrika":      { en:"Africa", nl:"Afrika", de:"Afrika", fr:"Afrique", es:"África", pt:"África", it:"Africa", tr:"Afrika", ar:"أفريقيا", zh:"非洲", hi:"अफ्रीका" },
    "Oceanië":     { en:"Oceania", nl:"Oceanië", de:"Ozeanien", fr:"Océanie", es:"Oceanía", pt:"Oceania", it:"Oceania", tr:"Okyanusya", ar:"أوقيانوسيا", zh:"大洋洲", hi:"ओशिनिया" },
  };

  function contLabel(key) {
    return (CONTINENTS_LABELS[key] || {})[langCode] || key;
  }

  // ── DUEL SETUP ──
  if (mode === "duel-setup") return (
    <div style={st.app}>
      <div style={st.header}>
        <span style={st.logo} onClick={() => setMode("home")}>🌍 {t.siteTitle}</span>
        <div style={{display:"flex",gap:8,alignItems:"center"}}><ThemeToggle theme={theme} onToggle={toggleTheme}/><LangSwitcher currentLang={langCode} /></div>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"80vh",padding:24}}>
        <div style={{...st.box,maxWidth:460,textAlign:"center"}}>
          <div style={{fontSize:52,marginBottom:10}}>⚔️</div>
          <h2 style={{margin:"0 0 6px",fontSize:"var(--font-2xl)"}}>{t.duelSetupTitle}</h2>
          <p style={{color:"var(--text-secondary)",marginBottom:6,fontSize:"var(--font-sm)"}}>{t.duelSetupDesc}</p>
          <p style={{color:"var(--text-muted)",marginBottom:26,fontSize:"var(--font-sm)"}}>{t.duelSetupRule}</p>
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:26}}>
            {[["🔴","#e94560",p1Name,setP1Name,t.player1],["🔵","#4a90d9",p2Name,setP2Name,t.player2]].map(([icon,color,val,set,ph])=>(
              <div key={ph} style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:"var(--font-lg)"}}>{icon}</span>
                <input style={{...st.input,width:"100%",border:`2px solid ${color}`}} placeholder={ph} value={val} onChange={e=>set(e.target.value)} onKeyDown={e=>e.key==="Enter"&&startDuel()}/>
              </div>
            ))}
          </div>
          <button style={{...st.btn(true),padding:"13px 36px",fontSize:"var(--font-base)",borderRadius:12,width:"100%"}} onClick={startDuel}>{t.startDuel}</button>
        </div>
      </div>
    </div>
  );

  // ── DUEL WINNER ──
  if (mode === "duel" && duelDone && winner !== null) {
    const winnerName = names[winner], loserName = names[winner===0?1:0];
    return (
      <div style={st.app}>
        <Confetti/>
        {showSave && <SaveScore score={duelScores[winner]} mode="duel" lang={langCode} t={t} onSave={handleSave} onSkip={()=>setShowSave(false)}/>}
        <div style={st.header}>
          <span style={st.logo} onClick={()=>setMode("home")}>🌍 {t.siteTitle}</span>
          <div style={{display:"flex",gap:8,alignItems:"center"}}><ThemeToggle theme={theme} onToggle={toggleTheme}/><LangSwitcher currentLang={langCode}/></div>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"80vh",padding:24}}>
          <div style={{...st.box,textAlign:"center",maxWidth:500}}>
            <div style={{fontSize:68,marginBottom:8}}>🏆</div>
            <h2 style={{margin:"0 0 4px",fontSize:"var(--font-2xl)",color:playerColors[winner]}}>{winnerName}</h2>
            <p style={{color:"var(--text-secondary)",fontSize:"var(--font-base)",marginBottom:6}}>{t.duelWins}</p>
            <p style={{color:"var(--text-muted)",fontSize:"var(--font-sm)",marginBottom:26}}>{loserName} {t.duelLoserNote}</p>
            <div style={{display:"flex",justifyContent:"center",gap:14,marginBottom:26}}>
              {[0,1].map(i=>(
                <div key={i} style={{background:"var(--card-bg)",borderRadius:12,padding:"12px 18px",border:`2px solid ${i===winner?"#f1c40f":"var(--card-bg)"}`}}>
                  <div style={{fontSize:"var(--font-xs)",color:"var(--text-secondary)",marginBottom:3}}>{names[i]}</div>
                  <div style={{fontSize:"var(--font-2xl)",fontWeight:800,color:playerColors[i]}}>{duelScores[i].toLocaleString()}</div>
                  <div style={{fontSize:"var(--font-sm)",color:"var(--text-secondary)"}}>{t.pts}</div>
                  <div style={{marginTop:5}}><Lives count={lives[i]}/></div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
              <button style={{...st.btn(true),padding:"10px 20px"}} onClick={()=>finishAndSave(duelScores[winner],"duel")}>{t.saveScore}</button>
              <button style={{...st.btn(false),padding:"10px 20px"}} onClick={()=>setMode("duel-setup")}>{t.playAgain}</button>
              <button style={{...st.btn(false),padding:"10px 20px"}} onClick={()=>setMode("home")}>{t.home}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── DUEL PLAYING ──
  if (mode === "duel" && duelList.length > 0) {
    const current = duelList[duelIndex];
    const isCorrect = duelAnswer === current?.id;
    const isTimeout = duelAnswer === -1;
    const cp = currentPlayer, nextCp = cp===0?1:0;
    return (
      <div style={st.app}>
        <div style={st.header}>
          <span style={st.logo} onClick={()=>setMode("home")}>🌍 {t.siteTitle}</span>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{display:"flex",gap:8,alignItems:"center"}}><ThemeToggle theme={theme} onToggle={toggleTheme}/><LangSwitcher currentLang={langCode}/></div>
            <button style={st.btn(false)} onClick={()=>setMode("home")}>{t.stop}</button>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:10,padding:"12px 20px 0",flexWrap:"wrap"}}>
          {[0,1].map(i=>(
            <div key={i} style={{flex:1,maxWidth:210,background:i===cp?`${playerColors[i]}18`:"rgba(255,255,255,0.03)",border:`2px solid ${i===cp?playerColors[i]:"var(--card-bg)"}`,borderRadius:12,padding:"10px 14px",transition:"all .3s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontWeight:700,fontSize:"var(--font-sm)",color:i===cp?playerColors[i]:"var(--text-muted)"}}>{i===cp?"▶ ":""}{names[i]}</span>
                <Lives count={lives[i]}/>
              </div>
              <div style={{fontSize:"var(--font-lg)",fontWeight:800,color:playerColors[i],marginTop:2}}>{duelScores[i].toLocaleString()} <span style={{fontSize:"var(--font-sm)",color:"var(--text-secondary)",fontWeight:400}}>{t.pts}</span></div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"18px 20px 36px",gap:18}}>
          <div style={{background:`${playerColors[cp]}18`,border:`1px solid ${playerColors[cp]}44`,borderRadius:20,padding:"5px 18px",fontSize:"var(--font-sm)",fontWeight:700,color:playerColors[cp]}}>
            {names[cp]} {t.yourTurn}
          </div>
          <div style={{background:"var(--card-bg)",borderRadius:16,padding:"18px 22px",width:"100%",maxWidth:480,textAlign:"center"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:12}}>
              <TimerRing timeLeft={duelTimeLeft}/>
              <div style={{textAlign:"left"}}>
                <div style={{fontSize:"var(--font-xs)",color:"var(--text-secondary)",textTransform:"uppercase",letterSpacing:1}}>{t.fasterMorePts}</div>
                <div style={{fontSize:"var(--font-sm)",color:"var(--text-secondary)",marginTop:2}}>{t.maxPts}</div>
              </div>
            </div>
            <span style={{fontSize:150,lineHeight:1,display:"block",textAlign:"center",margin:"8px auto"}}>{current.vlag}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,width:"100%",maxWidth:480}}>
            {duelOptions.map(opt=>{
              let bg="var(--card-bg)";
              if(duelAnswer!==null){if(opt.id===current.id)bg="var(--accent-green)";else if(opt.id===duelAnswer)bg="var(--accent-red)";}
              return <button key={opt.id} onClick={()=>handleDuelAnswer(opt)} style={{padding:"14px 12px",borderRadius:"var(--radius-sm)",border:"1px solid var(--border)",background:bg,color:bg==="var(--card-bg)"?"var(--text-primary)":"#ffffff",fontSize:"var(--font-base)",fontWeight:600,cursor:duelAnswer?"default":"pointer",transition:"background .2s",minHeight:52}}>{getCountryName(opt.naam, langCode)}</button>;
            })}
          </div>
          {duelAnswer !== null && !duelDone && (
            <div style={{textAlign:"center"}}>
              {isTimeout ? <p style={{color:"var(--accent-yellow)",fontWeight:700,fontSize:"var(--font-sm)",margin:"0 0 10px"}}>⏰ {t.timeout} <strong>{getCountryName(current.naam, langCode)}</strong></p>
               : isCorrect ? <p style={{color:"var(--accent-green)",fontWeight:700,fontSize:"var(--font-sm)",margin:"0 0 10px"}}>✓ {t.correct.split("!")[0]}! <span style={{color:"var(--accent-yellow)"}}>+{duelLastPoints} {t.pts}</span></p>
               : <p style={{color:"var(--accent-red)",fontWeight:700,fontSize:"var(--font-sm)",margin:"0 0 10px"}}>✗ {t.wrong} <strong>{getCountryName(current.naam, langCode)}</strong>{lives[cp]>0?`. ${lives[cp]} ${lives[cp]===1?t.lifeLeft:t.livesLeft}.`:""}</p>}
              <button style={{...st.btn(true),padding:"10px 26px",fontSize:"var(--font-sm)"}} onClick={nextDuelQuestion}>
                {t.next} ({names[nextCp]} {t.yourTurn})
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── SOLO DONE ──
  if (mode === "quiz" && quizDone) {
    const pct = Math.round((score / (quizList.length * 100)) * 100);
    return (
      <div style={st.app}>
        {showSave && <SaveScore score={score} mode="solo" lang={langCode} t={t} onSave={handleSave} onSkip={()=>setShowSave(false)}/>}
        <div style={st.header}>
          <span style={st.logo} onClick={()=>setMode("home")}>🌍 {t.siteTitle}</span>
          <div style={{display:"flex",gap:8,alignItems:"center"}}><ThemeToggle theme={theme} onToggle={toggleTheme}/><LangSwitcher currentLang={langCode}/></div>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"80vh",padding:24}}>
          <div style={{...st.box,textAlign:"center",maxWidth:460}}>
            <div style={{fontSize:64,marginBottom:10}}>{pct>=80?"🏆":pct>=50?"🎯":"📚"}</div>
            <h2 style={{margin:"0 0 4px",fontSize:"var(--font-2xl)"}}>{t.quizDone}</h2>
            <p style={{color:"var(--text-secondary)",marginBottom:4,fontSize:"var(--font-sm)"}}>{t.totalScore} <strong style={{color:"var(--text-primary)",fontSize:"var(--font-md)"}}>{score.toLocaleString()} {t.pts}</strong></p>
            <p style={{color:"var(--text-muted)",marginBottom:22,fontSize:"var(--font-xs)"}}>{t.maxPossible} {(quizList.length*100).toLocaleString()} {t.points}</p>
            <div style={{fontSize:"var(--font-3xl)",fontWeight:800,color:"var(--accent-red)",marginBottom:26}}>{pct}%</div>
            <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
              <button style={{...st.btn(true),padding:"10px 20px"}} onClick={()=>finishAndSave(score,"solo")}>{t.saveScore}</button>
              <button style={{...st.btn(false),padding:"10px 20px"}} onClick={startQuiz}>{t.playAgain}</button>
              <button style={{...st.btn(false),padding:"10px 20px"}} onClick={()=>setMode("home")}>{t.home}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SOLO QUIZ ──
  if (mode === "quiz" && quizList.length > 0) {
    const current = quizList[quizIndex];
    const isCorrect = quizAnswer === current.id;
    const isTimeout = quizAnswer === -1;
    return (
      <div style={st.app}>
        <div style={st.header}>
          <span style={st.logo} onClick={()=>setMode("home")}>🌍 {t.siteTitle}</span>
          <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <span style={{color:"var(--text-muted)",fontSize:"var(--font-xs)"}}>{t.questionOf} {quizIndex+1} {t.of} {quizList.length}</span>
            <span style={{fontWeight:800,fontSize:"var(--font-base)",color:"var(--accent-yellow)"}}>{score.toLocaleString()} {t.pts}</span>
            <div style={{display:"flex",gap:8,alignItems:"center"}}><ThemeToggle theme={theme} onToggle={toggleTheme}/><LangSwitcher currentLang={langCode}/></div>
            <button style={st.btn(false)} onClick={()=>setMode("home")}>{t.stop}</button>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"28px 20px",gap:20}}>
          <div style={{background:"var(--card-bg)",borderRadius:16,padding:"18px 22px",width:"100%",maxWidth:480,textAlign:"center"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:12}}>
              <TimerRing timeLeft={timeLeft}/>
              <div style={{textAlign:"left"}}>
                <div style={{fontSize:"var(--font-xs)",color:"var(--text-secondary)",textTransform:"uppercase",letterSpacing:1}}>{t.fasterMorePts}</div>
                <div style={{fontSize:"var(--font-sm)",color:"var(--text-secondary)",marginTop:2}}>
                  {quizAnswer === null
                    ? <>{t.currentPts} <strong style={{color:"var(--text-primary)"}}>{calcPoints(timeLeft)} {t.pts}</strong></>
                    : lastPoints > 0 ? <span style={{color:"var(--accent-green)",fontWeight:700}}>+{lastPoints} {t.earnedPts}</span>
                    : <span style={{color:"var(--accent-red)"}}>0 {t.pts}</span>}
                </div>
              </div>
            </div>
            <p style={{color:"var(--text-secondary)",margin:"0 0 12px",fontSize:"var(--font-base)"}}>{t.quizTitle}</p>
            <span style={{fontSize:150,lineHeight:1,display:"block",textAlign:"center",margin:"8px auto"}}>{current.vlag}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,width:"100%",maxWidth:480}}>
            {quizOptions.map(opt=>{
              let bg="var(--card-bg)";
              if(quizAnswer!==null){if(opt.id===current.id)bg="var(--accent-green)";else if(opt.id===quizAnswer)bg="var(--accent-red)";}
              return <button key={opt.id} onClick={()=>handleAnswer(opt)} style={{padding:"14px 12px",borderRadius:"var(--radius-sm)",border:"1px solid var(--border)",background:bg,color:bg==="var(--card-bg)"?"var(--text-primary)":"#ffffff",fontSize:"var(--font-base)",fontWeight:600,cursor:quizAnswer?"default":"pointer",transition:"background .2s",minHeight:52}}>{getCountryName(opt.naam, langCode)}</button>;
            })}
          </div>
          {quizAnswer !== null && (
            <div style={{textAlign:"center"}}>
              {isTimeout ? <p style={{color:"var(--accent-yellow)",fontWeight:700,fontSize:"var(--font-sm)",margin:"0 0 10px"}}>⏰ {t.timeout} <strong>{getCountryName(current.naam, langCode)}</strong></p>
               : isCorrect ? <p style={{color:"var(--accent-green)",fontWeight:700,fontSize:"var(--font-sm)",margin:"0 0 10px"}}>✓ {t.correct} {countdown??0} {countdown===1?t.second:t.seconds}...</p>
               : <p style={{color:"var(--accent-red)",fontWeight:700,fontSize:"var(--font-sm)",margin:"0 0 10px"}}>✗ {t.wrong} <strong>{getCountryName(current.naam, langCode)}</strong></p>}
              <button style={{...st.btn(true),padding:"10px 26px",fontSize:"var(--font-sm)"}} onClick={nextQuestion}>
                {quizIndex+1 < quizList.length ? t.next : t.viewResult}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── HOME & BROWSE ──
  return (
    <div style={st.app}>
      {showLeaderboard && <Leaderboard t={t} onClose={()=>setShowLeaderboard(false)}/>}

      <div style={st.header}>
        <span style={st.logo} onClick={()=>setMode("home")}>🌍 {t.siteTitle}</span>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          <button style={st.btn(mode==="browse")} onClick={()=>setMode("browse")}>{t.btnBrowse}</button>
          <button style={st.btn(false)} onClick={startQuiz}>{t.btnSolo}</button>
          <button style={{...st.btn(false),background:"linear-gradient(90deg,#e9456033,#4a90d933)",border:"1px solid var(--border)"}} onClick={()=>setMode("duel-setup")}>{t.btnDuel}</button>
          <button style={{...st.btn(false),background:"rgba(241,196,15,0.12)",border:"1px solid rgba(241,196,15,0.25)",color:"var(--accent-yellow)"}} onClick={()=>setShowLeaderboard(true)}>{t.scores}</button>
          <div style={{display:"flex",gap:8,alignItems:"center"}}><ThemeToggle theme={theme} onToggle={toggleTheme}/><LangSwitcher currentLang={langCode}/></div>
        </div>
      </div>

      {mode === "home" && (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"44px 20px 60px",textAlign:"center"}}>
          <div style={{fontSize:68,marginBottom:14}}>🌍</div>
          <h1 style={{fontSize:"var(--font-3xl)",margin:"0 0 10px",fontWeight:900,lineHeight:1.1}}>{t.siteTitle}</h1>
          <p style={{color:"var(--accent-blue)",fontSize:"var(--font-xs)",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>{t.tagline}</p>
          <p style={{color:"var(--text-secondary)",fontSize:"var(--font-md)",maxWidth:540,marginBottom:10,lineHeight:1.65}} dangerouslySetInnerHTML={{__html:t.heroText}}/>
          <p style={{color:"var(--text-secondary)",fontSize:"var(--font-base)",maxWidth:480,marginBottom:34,lineHeight:1.6}}>{t.subText}</p>

          <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom:44}}>
            <button style={{...st.btn(false),padding:"13px 26px",fontSize:"var(--font-base)",borderRadius:12,background:"var(--btn-default-bg)"}} onClick={()=>setMode("browse")}>🗺 {t.btnBrowse}</button>
            <button style={{...st.btn(true),padding:"13px 26px",fontSize:"var(--font-base)",borderRadius:12}} onClick={startQuiz}>🎯 {t.btnSolo}</button>
            <button style={{padding:"13px 26px",fontSize:"var(--font-base)",borderRadius:12,border:"none",cursor:"pointer",fontWeight:700,background:"linear-gradient(135deg,#e94560,#4a90d9)",color:"var(--text-primary)"}} onClick={()=>setMode("duel-setup")}>⚔️ {t.btnDuel}</button>
          </div>

          {/* Feature cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:14,maxWidth:700,width:"100%",marginBottom:44}}>
            {[[" ⏱️",t.featureTimer,t.featureTimerDesc],["🌍",t.feature190,t.feature190Desc],["⚔️",t.featureDuel,t.featureDuelDesc],["🏆",t.featureScore,t.featureScoreDesc]].map(([icon,title,desc])=>(
              <div key={title} style={{background:"var(--card-bg)",borderRadius:14,padding:"18px 16px",border:"1px solid var(--card-border)",textAlign:"left"}}>
                <div style={{fontSize:"var(--font-2xl)",marginBottom:8}}>{icon}</div>
                <h2 style={{margin:"0 0 5px",fontSize:"var(--font-sm)",fontWeight:700}}>{title}</h2>
                <p style={{margin:0,color:"var(--text-secondary)",fontSize:"var(--font-sm)",lineHeight:1.6}}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Mini leaderboard */}
          {topScores.length > 0 && (
            <div style={{background:"var(--card-bg)",borderRadius:16,padding:"18px 24px",maxWidth:380,width:"100%",border:"1px solid var(--card-border)",marginBottom:36}}>
              <div style={{fontSize:"var(--font-xs)",color:"var(--text-secondary)",marginBottom:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>{t.topScores}</div>
              {topScores.slice(0,5).map((r,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid var(--border)",fontSize:"var(--font-sm)"}}>
                  <span><span style={{color:["var(--gold)","var(--silver)","var(--bronze)"][i]||"var(--text-muted)",fontWeight:700,marginRight:6}}>{i+1}.</span>{r.name} <span style={{color:"var(--text-muted)",fontSize:"var(--font-xs)"}}>({r.mode})</span></span>
                  <span style={{fontWeight:700,color:"var(--accent-red)"}}>{r.score.toLocaleString()}</span>
                </div>
              ))}
              <button onClick={()=>setShowLeaderboard(true)} style={{marginTop:10,fontSize:"var(--font-xs)",color:"var(--accent-blue)",background:"none",border:"none",cursor:"pointer"}}>{t.allScores}</button>
            </div>
          )}

          {/* Language links for SEO */}
          <div style={{marginBottom:24,display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
            {LANGUAGES.map(l=>(
              <a key={l.code} href={l.path}
                style={{fontSize:"var(--font-xs)",padding:"3px 10px",borderRadius:12,background:"var(--card-bg)",color:"var(--text-muted)",textDecoration:"none",border:"1px solid var(--card-border)"}}>
                {l.flag} {l.name}
              </a>
            ))}
          </div>

          {/* Continent links */}
          <div style={{marginBottom:12}}>
            <p style={{color:"var(--text-muted)",fontSize:"var(--font-xs)",marginBottom:8}}>{t.continentPractice}</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
              {CONTINENTEN.filter(c=>c!=="Alle").map(c=>(
                <span key={c} style={{fontSize:"var(--font-xs)",background:"var(--card-bg)",padding:"3px 10px",borderRadius:14,color:"var(--text-muted)",border:"1px solid var(--border)"}}>
                  {FLAGS.filter(f=>f.continent===c).length} {t.flagsOf} {contLabel(c)}
                </span>
              ))}
            </div>
          </div>
          <p style={{color:"var(--text-subtle)",fontSize:"var(--font-xs)",maxWidth:520,lineHeight:1.6,marginTop:6}}>{t.seoCopy}</p>
        </div>
      )}

      {mode === "browse" && (
        <>
          <div style={{padding:"12px 20px",display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
            <input style={st.input} placeholder={t.searchPlaceholder} value={search} onChange={e=>setSearch(e.target.value)}/>
            <select style={st.select} value={continent} onChange={e=>setContinent(e.target.value)}>
              {CONTINENTEN.map(c=><option key={c} value={c}>{contLabel(c)}</option>)}
            </select>
            <span style={{color:"var(--text-muted)",fontSize:"var(--font-xs)"}}>{filtered.length} {t.countries}</span>
          </div>
          <div style={st.grid}>
            {filtered.map(f=>(
              <div key={f.id} style={st.card} onClick={()=>setSelected(f)}>
                <span style={{fontSize:64,lineHeight:1,display:"block",textAlign:"center",margin:"4px auto 8px"}}>{f.vlag}</span>
                <div style={{fontSize:"var(--font-sm)",fontWeight:600,textAlign:"center",color:"var(--text-primary)"}}>{getCountryName(f.naam, langCode)}</div>
                <div style={{textAlign:"center",fontSize:"var(--font-xs)",color:"var(--text-secondary)",marginTop:3}}>{contLabel(f.continent)}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {selected && (
        <div style={st.modal} onClick={()=>setSelected(null)}>
          <div style={st.box} onClick={e=>e.stopPropagation()}>
            <span style={{fontSize:120,lineHeight:1,display:"block",textAlign:"center",margin:"0 auto 18px"}}>{selected.vlag}</span>
            <h2 style={{margin:"0 0 6px",fontSize:"var(--font-xl)"}}>{getCountryName(selected.naam, langCode)}</h2>
            <p style={{color:"var(--text-secondary)",margin:"0 0 5px",fontSize:"var(--font-base)"}}>🏛 {t.capital}: <strong style={{color:"var(--text-primary)"}}>{selected.hoofdstad}</strong></p>
            <p style={{color:"var(--text-secondary)",margin:"0 0 10px",fontSize:"var(--font-base)"}}>🌍 {t.continent}: <strong style={{color:"var(--text-primary)"}}>{contLabel(selected.continent)}</strong></p>
            <p style={{color:"var(--text-muted)",margin:"0 0 6px",fontSize:"var(--font-xs)"}}>{t.colors}:</p>
            <div>{selected.kleuren.map(k=><ColorTag key={k} c={k}/>)}</div>
            {selected.symbool && <p style={{color:"var(--text-muted)",fontSize:"var(--font-xs)",marginTop:8}}>{t.hasSymbol}</p>}
            <button style={{...st.btn(false),marginTop:16,width:"100%"}} onClick={()=>setSelected(null)}>{t.close}</button>
          </div>
        </div>
      )}
    </div>
  );
}
