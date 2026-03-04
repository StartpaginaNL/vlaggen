import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LANGUAGES, getLang, getLangMeta } from "./i18n.js";

const FLAGS = [
  {id:1,naam:"Nederland",continent:"Europa",hoofdstad:"Amsterdam",vlag:"/flags/Nederland.svg",symbool:false,kleuren:["rood","wit","blauw"]},
  {id:2,naam:"Duitsland",continent:"Europa",hoofdstad:"Berlijn",vlag:"/flags/Duitsland.svg",symbool:false,kleuren:["zwart","rood","geel"]},
  {id:3,naam:"Italië",continent:"Europa",hoofdstad:"Rome",vlag:"/flags/Italie.svg",symbool:false,kleuren:["groen","wit","rood"]},
  {id:4,naam:"België",continent:"Europa",hoofdstad:"Brussel",vlag:"/flags/Belgie.svg",symbool:false,kleuren:["zwart","geel","rood"]},
  {id:5,naam:"Frankrijk",continent:"Europa",hoofdstad:"Parijs",vlag:"/flags/Frankrijk.svg",symbool:false,kleuren:["blauw","wit","rood"]},
  {id:6,naam:"Spanje",continent:"Europa",hoofdstad:"Madrid",vlag:"/flags/Spanje.svg",symbool:true,kleuren:["rood","geel"]},
  {id:7,naam:"Portugal",continent:"Europa",hoofdstad:"Lissabon",vlag:"/flags/Portugal.svg",symbool:true,kleuren:["groen","rood"]},
  {id:8,naam:"Albanië",continent:"Europa",hoofdstad:"Tirana",vlag:"/flags/Albanie.svg",symbool:true,kleuren:["rood","zwart"]},
  {id:9,naam:"Andorra",continent:"Europa",hoofdstad:"Andorra la Vella",vlag:"/flags/Andorra.svg",symbool:true,kleuren:["blauw","geel","rood"]},
  {id:10,naam:"Armenië",continent:"Europa",hoofdstad:"Jerevan",vlag:"/flags/Armenie.svg",symbool:false,kleuren:["rood","blauw","geel"]},
  {id:11,naam:"Azerbeidzjan",continent:"Europa",hoofdstad:"Bakoe",vlag:"/flags/Azerbeidzjan.svg",symbool:true,kleuren:["blauw","rood","groen"]},
  {id:12,naam:"Bosnië en Herzegovina",continent:"Europa",hoofdstad:"Sarajevo",vlag:"/flags/Bosnie_en_Herzegovina.svg",symbool:false,kleuren:["blauw","geel","wit"]},
  {id:13,naam:"Bulgarije",continent:"Europa",hoofdstad:"Sofia",vlag:"/flags/Bulgarije.svg",symbool:false,kleuren:["wit","groen","rood"]},
  {id:14,naam:"Cyprus",continent:"Europa",hoofdstad:"Nicosia",vlag:"/flags/Cyprus.svg",symbool:true,kleuren:["wit","oranje","groen"]},
  {id:15,naam:"Denemarken",continent:"Europa",hoofdstad:"Kopenhagen",vlag:"/flags/Denemarken.svg",symbool:false,kleuren:["rood","wit"]},
  {id:16,naam:"Estland",continent:"Europa",hoofdstad:"Tallinn",vlag:"/flags/Estland.svg",symbool:false,kleuren:["blauw","zwart","wit"]},
  {id:17,naam:"Finland",continent:"Europa",hoofdstad:"Helsinki",vlag:"/flags/Finland.svg",symbool:false,kleuren:["wit","blauw"]},
  {id:18,naam:"Georgië",continent:"Europa",hoofdstad:"Tbilisi",vlag:"/flags/Georgie.svg",symbool:false,kleuren:["wit","rood"]},
  {id:19,naam:"Griekenland",continent:"Europa",hoofdstad:"Athene",vlag:"/flags/Griekenland.svg",symbool:false,kleuren:["blauw","wit"]},
  {id:20,naam:"Hongarije",continent:"Europa",hoofdstad:"Boedapest",vlag:"/flags/Hongarije.svg",symbool:false,kleuren:["rood","wit","groen"]},
  {id:21,naam:"Ierland",continent:"Europa",hoofdstad:"Dublin",vlag:"/flags/Ierland.svg",symbool:false,kleuren:["groen","wit","oranje"]},
  {id:22,naam:"IJsland",continent:"Europa",hoofdstad:"Reykjavik",vlag:"/flags/IJsland.svg",symbool:false,kleuren:["blauw","rood","wit"]},
  {id:23,naam:"Kazachstan",continent:"Europa",hoofdstad:"Astana",vlag:"/flags/Kazachstan.svg",symbool:true,kleuren:["lichtblauw","geel"]},
  {id:24,naam:"Kosovo",continent:"Europa",hoofdstad:"Pristina",vlag:"/flags/Kosovo.svg",symbool:true,kleuren:["blauw","wit"]},
  {id:25,naam:"Kroatië",continent:"Europa",hoofdstad:"Zagreb",vlag:"/flags/Kroatie.svg",symbool:true,kleuren:["rood","wit","blauw"]},
  {id:26,naam:"Letland",continent:"Europa",hoofdstad:"Riga",vlag:"/flags/Letland.svg",symbool:false,kleuren:["rood","wit"]},
  {id:27,naam:"Liechtenstein",continent:"Europa",hoofdstad:"Vaduz",vlag:"/flags/Liechtenstein.svg",symbool:true,kleuren:["geel","blauw","rood"]},
  {id:28,naam:"Litouwen",continent:"Europa",hoofdstad:"Vilnius",vlag:"/flags/Litouwen.svg",symbool:false,kleuren:["geel","groen","rood"]},
  {id:29,naam:"Luxemburg",continent:"Europa",hoofdstad:"Luxemburg",vlag:"/flags/Luxemburg.svg",symbool:false,kleuren:["rood","wit","lichtblauw"]},
  {id:30,naam:"Malta",continent:"Europa",hoofdstad:"Valletta",vlag:"/flags/Malta.svg",symbool:true,kleuren:["wit","rood"]},
  {id:31,naam:"Moldavië",continent:"Europa",hoofdstad:"Chisinau",vlag:"/flags/Moldavie.svg",symbool:true,kleuren:["blauw","geel","rood"]},
  {id:32,naam:"Monaco",continent:"Europa",hoofdstad:"Monaco-Ville",vlag:"/flags/Monaco.svg",symbool:false,kleuren:["rood","wit"]},
  {id:33,naam:"Montenegro",continent:"Europa",hoofdstad:"Podgorica",vlag:"/flags/Montenegro.svg",symbool:true,kleuren:["rood","geel"]},
  {id:34,naam:"Noord-Macedonië",continent:"Europa",hoofdstad:"Skopje",vlag:"/flags/Noord-Macedonie.svg",symbool:false,kleuren:["rood","geel"]},
  {id:35,naam:"Noorwegen",continent:"Europa",hoofdstad:"Oslo",vlag:"/flags/Noorwegen.svg",symbool:false,kleuren:["rood","blauw","wit"]},
  {id:36,naam:"Oekraïne",continent:"Europa",hoofdstad:"Kiev",vlag:"/flags/Oekraine.svg",symbool:false,kleuren:["blauw","geel"]},
  {id:37,naam:"Oostenrijk",continent:"Europa",hoofdstad:"Wenen",vlag:"/flags/Oostenrijk.svg",symbool:false,kleuren:["rood","wit"]},
  {id:38,naam:"Polen",continent:"Europa",hoofdstad:"Warschau",vlag:"/flags/Polen.svg",symbool:false,kleuren:["wit","rood"]},
  {id:39,naam:"Roemenië",continent:"Europa",hoofdstad:"Boekarest",vlag:"/flags/Roemenie.svg",symbool:false,kleuren:["blauw","geel","rood"]},
  {id:40,naam:"Rusland",continent:"Europa",hoofdstad:"Moskou",vlag:"/flags/Rusland.svg",symbool:false,kleuren:["wit","blauw","rood"]},
  {id:41,naam:"San Marino",continent:"Europa",hoofdstad:"San Marino",vlag:"/flags/San_Marino.svg",symbool:true,kleuren:["wit","blauw"]},
  {id:42,naam:"Servië",continent:"Europa",hoofdstad:"Belgrado",vlag:"/flags/Servie.svg",symbool:true,kleuren:["rood","blauw","wit"]},
  {id:43,naam:"Slovenië",continent:"Europa",hoofdstad:"Ljubljana",vlag:"/flags/Slovenie.svg",symbool:true,kleuren:["wit","blauw","rood"]},
  {id:44,naam:"Slowakije",continent:"Europa",hoofdstad:"Bratislava",vlag:"/flags/Slowakije.svg",symbool:true,kleuren:["wit","blauw","rood"]},
  {id:45,naam:"Tsjechië",continent:"Europa",hoofdstad:"Praag",vlag:"/flags/Tsjechie.svg",symbool:false,kleuren:["blauw","rood","wit"]},
  {id:46,naam:"Turkije",continent:"Europa",hoofdstad:"Ankara",vlag:"/flags/Turkije.svg",symbool:true,kleuren:["rood","wit"]},
  {id:47,naam:"Vaticaanstad",continent:"Europa",hoofdstad:"Vaticaanstad",vlag:"/flags/Vaticaanstad.svg",symbool:true,kleuren:["geel","wit"]},
  {id:48,naam:"Verenigd Koninkrijk",continent:"Europa",hoofdstad:"Londen",vlag:"/flags/Verenigd_Koninkrijk.svg",symbool:false,kleuren:["blauw","rood","wit"]},
  {id:49,naam:"Wit-Rusland",continent:"Europa",hoofdstad:"Minsk",vlag:"/flags/Wit-Rusland.svg",symbool:true,kleuren:["rood","groen","wit"]},
  {id:50,naam:"Zweden",continent:"Europa",hoofdstad:"Stockholm",vlag:"/flags/Zweden.svg",symbool:false,kleuren:["blauw","geel"]},
  {id:51,naam:"Zwitserland",continent:"Europa",hoofdstad:"Bern",vlag:"/flags/Zwitserland.svg",symbool:false,kleuren:["rood","wit"]},
  {id:52,naam:"Antigua en Barbuda",continent:"Noord Amerika",hoofdstad:"Saint John's",vlag:"/flags/Antigua_en_Barbuda.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:53,naam:"Bahama's",continent:"Noord Amerika",hoofdstad:"Nassau",vlag:"/flags/Bahamas.svg",symbool:false,kleuren:["blauw","geel","zwart"]},
  {id:54,naam:"Barbados",continent:"Noord Amerika",hoofdstad:"Bridgetown",vlag:"/flags/Barbados.svg",symbool:true,kleuren:["blauw","geel"]},
  {id:55,naam:"Belize",continent:"Noord Amerika",hoofdstad:"Belmopan",vlag:"/flags/Belize.svg",symbool:true,kleuren:["rood","blauw","wit"]},
  {id:56,naam:"Canada",continent:"Noord Amerika",hoofdstad:"Ottawa",vlag:"/flags/Canada.svg",symbool:true,kleuren:["rood","wit"]},
  {id:57,naam:"Costa Rica",continent:"Noord Amerika",hoofdstad:"San José",vlag:"/flags/Costa_Rica.svg",symbool:false,kleuren:["blauw","wit","rood"]},
  {id:58,naam:"Cuba",continent:"Noord Amerika",hoofdstad:"Havana",vlag:"/flags/Cuba.svg",symbool:true,kleuren:["rood","blauw","wit"]},
  {id:59,naam:"Dominica",continent:"Noord Amerika",hoofdstad:"Roseau",vlag:"/flags/Dominica.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:60,naam:"Dominicaanse Republiek",continent:"Noord Amerika",hoofdstad:"Santo Domingo",vlag:"/flags/Dominicaanse_Republiek.svg",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:61,naam:"El Salvador",continent:"Noord Amerika",hoofdstad:"San Salvador",vlag:"/flags/El_Salvador.svg",symbool:true,kleuren:["blauw","wit"]},
  {id:62,naam:"Grenada",continent:"Noord Amerika",hoofdstad:"Saint George's",vlag:"/flags/Grenada.svg",symbool:true,kleuren:["rood","geel","groen"]},
  {id:63,naam:"Guatemala",continent:"Noord Amerika",hoofdstad:"Guatemala-stad",vlag:"/flags/Guatemala.svg",symbool:true,kleuren:["lichtblauw","wit"]},
  {id:64,naam:"Haïti",continent:"Noord Amerika",hoofdstad:"Port-au-Prince",vlag:"/flags/Haiti.svg",symbool:true,kleuren:["blauw","rood"]},
  {id:65,naam:"Honduras",continent:"Noord Amerika",hoofdstad:"Tegucigalpa",vlag:"/flags/Honduras.svg",symbool:false,kleuren:["lichtblauw","wit"]},
  {id:66,naam:"Jamaica",continent:"Noord Amerika",hoofdstad:"Kingston",vlag:"/flags/Jamaica.svg",symbool:false,kleuren:["groen","zwart","geel"]},
  {id:67,naam:"Mexico",continent:"Noord Amerika",hoofdstad:"Mexico-Stad",vlag:"/flags/Mexico.svg",symbool:true,kleuren:["groen","wit","rood"]},
  {id:68,naam:"Nicaragua",continent:"Noord Amerika",hoofdstad:"Managua",vlag:"/flags/Nicaragua.svg",symbool:true,kleuren:["blauw","wit"]},
  {id:69,naam:"Panama",continent:"Noord Amerika",hoofdstad:"Panama-Stad",vlag:"/flags/Panama.svg",symbool:false,kleuren:["rood","blauw","wit"]},
  {id:70,naam:"Saint Kitts en Nevis",continent:"Noord Amerika",hoofdstad:"Basseterre",vlag:"/flags/Saint_Kitts_en_Nevis.svg",symbool:true,kleuren:["groen","zwart","rood"]},
  {id:71,naam:"Saint Lucia",continent:"Noord Amerika",hoofdstad:"Castries",vlag:"/flags/Saint_Lucia.svg",symbool:true,kleuren:["lichtblauw","zwart","geel"]},
  {id:72,naam:"Saint Vincent en de Grenadines",continent:"Noord Amerika",hoofdstad:"Kingstown",vlag:"/flags/Saint_Vincent_en_de_Grenadines.svg",symbool:true,kleuren:["blauw","geel","groen"]},
  {id:73,naam:"Trinidad en Tobago",continent:"Noord Amerika",hoofdstad:"Port of Spain",vlag:"/flags/Trinidad_en_Tobago.svg",symbool:false,kleuren:["rood","zwart","wit"]},
  {id:74,naam:"Verenigde Staten",continent:"Noord Amerika",hoofdstad:"Washington D.C.",vlag:"/flags/Verenigde_Staten.svg",symbool:false,kleuren:["rood","wit","blauw"]},
  {id:75,naam:"Argentinië",continent:"Zuid Amerika",hoofdstad:"Buenos Aires",vlag:"/flags/Argentinie.svg",symbool:true,kleuren:["lichtblauw","wit","geel"]},
  {id:76,naam:"Bolivia",continent:"Zuid Amerika",hoofdstad:"Sucre",vlag:"/flags/Bolivia.svg",symbool:false,kleuren:["rood","geel","groen"]},
  {id:77,naam:"Brazilië",continent:"Zuid Amerika",hoofdstad:"Brasilia",vlag:"/flags/Brazilie.svg",symbool:true,kleuren:["groen","geel","blauw"]},
  {id:78,naam:"Chili",continent:"Zuid Amerika",hoofdstad:"Santiago",vlag:"/flags/Chili.svg",symbool:true,kleuren:["blauw","wit","rood"]},
  {id:79,naam:"Colombia",continent:"Zuid Amerika",hoofdstad:"Bogotá",vlag:"/flags/Colombia.svg",symbool:false,kleuren:["geel","blauw","rood"]},
  {id:80,naam:"Ecuador",continent:"Zuid Amerika",hoofdstad:"Quito",vlag:"/flags/Ecuador.svg",symbool:true,kleuren:["geel","blauw","rood"]},
  {id:81,naam:"Frans Guyana",continent:"Zuid Amerika",hoofdstad:"Cayenne",vlag:"/flags/Frans_Guyana.svg",symbool:false,kleuren:["blauw","wit","rood"]},
  {id:82,naam:"Guyana",continent:"Zuid Amerika",hoofdstad:"Georgetown",vlag:"/flags/Guyana.svg",symbool:false,kleuren:["rood","geel","groen"]},
  {id:83,naam:"Paraguay",continent:"Zuid Amerika",hoofdstad:"Asunción",vlag:"/flags/Paraguay.svg",symbool:true,kleuren:["rood","wit","blauw"]},
  {id:84,naam:"Peru",continent:"Zuid Amerika",hoofdstad:"Lima",vlag:"/flags/Peru.svg",symbool:false,kleuren:["rood","wit"]},
  {id:85,naam:"Suriname",continent:"Zuid Amerika",hoofdstad:"Paramaribo",vlag:"/flags/Suriname.svg",symbool:true,kleuren:["groen","rood","wit"]},
  {id:86,naam:"Uruguay",continent:"Zuid Amerika",hoofdstad:"Montevideo",vlag:"/flags/Uruguay.svg",symbool:true,kleuren:["geel","wit","blauw"]},
  {id:87,naam:"Venezuela",continent:"Zuid Amerika",hoofdstad:"Caracas",vlag:"/flags/Venezuela.svg",symbool:true,kleuren:["geel","blauw","rood"]},
  {id:88,naam:"Australië",continent:"Oceanië",hoofdstad:"Canberra",vlag:"/flags/Australie.svg",symbool:true,kleuren:["rood","blauw","wit"]},
  {id:89,naam:"Fiji",continent:"Oceanië",hoofdstad:"Suva",vlag:"/flags/Fiji.svg",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:90,naam:"Kiribati",continent:"Oceanië",hoofdstad:"Zuid-Tarawa",vlag:"/flags/Kiribati.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:91,naam:"Marshalleilanden",continent:"Oceanië",hoofdstad:"Majuro",vlag:"/flags/Marshalleilanden.svg",symbool:true,kleuren:["wit","blauw","oranje"]},
  {id:92,naam:"Micronesië",continent:"Oceanië",hoofdstad:"Palikir",vlag:"/flags/Micronesie.svg",symbool:true,kleuren:["blauw","wit"]},
  {id:93,naam:"Nauru",continent:"Oceanië",hoofdstad:"Yaren",vlag:"/flags/Nauru.svg",symbool:true,kleuren:["blauw","geel","wit"]},
  {id:94,naam:"Nieuw-Zeeland",continent:"Oceanië",hoofdstad:"Wellington",vlag:"/flags/Nieuw-Zeeland.svg",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:95,naam:"Palau",continent:"Oceanië",hoofdstad:"Ngerulmud",vlag:"/flags/Palau.svg",symbool:false,kleuren:["blauw","geel"]},
  {id:96,naam:"Papoea-Nieuw-Guinea",continent:"Oceanië",hoofdstad:"Port Moresby",vlag:"/flags/Papoea-Nieuw-Guinea.svg",symbool:true,kleuren:["zwart","rood","geel"]},
  {id:97,naam:"Salomonseilanden",continent:"Oceanië",hoofdstad:"Honiara",vlag:"/flags/Salomonseilanden.svg",symbool:true,kleuren:["blauw","geel","groen"]},
  {id:98,naam:"Samoa",continent:"Oceanië",hoofdstad:"Apia",vlag:"/flags/Samoa.svg",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:99,naam:"Tonga",continent:"Oceanië",hoofdstad:"Nuku'alofa",vlag:"/flags/Tonga.svg",symbool:false,kleuren:["rood","wit"]},
  {id:100,naam:"Tuvalu",continent:"Oceanië",hoofdstad:"Funafuti",vlag:"/flags/Tuvalu.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:101,naam:"Vanuatu",continent:"Oceanië",hoofdstad:"Port Vila",vlag:"/flags/Vanuatu.svg",symbool:true,kleuren:["rood","zwart","groen"]},
  {id:102,naam:"Afghanistan",continent:"Azië",hoofdstad:"Kabul",vlag:"/flags/Afghanistan.svg",symbool:true,kleuren:["wit","zwart"]},
  {id:103,naam:"Bahrein",continent:"Azië",hoofdstad:"Manama",vlag:"/flags/Bahrein.svg",symbool:false,kleuren:["wit","rood"]},
  {id:104,naam:"Bangladesh",continent:"Azië",hoofdstad:"Dhaka",vlag:"/flags/Bangladesh.svg",symbool:false,kleuren:["groen","rood"]},
  {id:105,naam:"Bhutan",continent:"Azië",hoofdstad:"Thimphu",vlag:"/flags/Bhutan.svg",symbool:true,kleuren:["geel","oranje","wit"]},
  {id:106,naam:"Brunei",continent:"Azië",hoofdstad:"Bandar Seri Begawan",vlag:"/flags/Brunei.svg",symbool:true,kleuren:["geel","wit","zwart"]},
  {id:107,naam:"Cambodja",continent:"Azië",hoofdstad:"Phnom Penh",vlag:"/flags/Cambodja.svg",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:108,naam:"China",continent:"Azië",hoofdstad:"Peking",vlag:"/flags/China.svg",symbool:true,kleuren:["geel","rood"]},
  {id:109,naam:"Egypte",continent:"Azië",hoofdstad:"Cairo",vlag:"/flags/Egypte.svg",symbool:true,kleuren:["rood","wit","zwart"]},
  {id:110,naam:"Filipijnen",continent:"Azië",hoofdstad:"Manilla",vlag:"/flags/Filipijnen.svg",symbool:true,kleuren:["rood","wit","blauw"]},
  {id:111,naam:"India",continent:"Azië",hoofdstad:"New Delhi",vlag:"/flags/India.svg",symbool:true,kleuren:["oranje","wit","groen"]},
  {id:112,naam:"Indonesië",continent:"Azië",hoofdstad:"Jakarta",vlag:"/flags/Indonesie.svg",symbool:false,kleuren:["rood","wit"]},
  {id:113,naam:"Irak",continent:"Azië",hoofdstad:"Bagdad",vlag:"/flags/Irak.svg",symbool:true,kleuren:["rood","wit","zwart"]},
  {id:114,naam:"Iran",continent:"Azië",hoofdstad:"Teheran",vlag:"/flags/Iran.svg",symbool:true,kleuren:["groen","wit","rood"]},
  {id:115,naam:"Israël",continent:"Azië",hoofdstad:"Jeruzalem",vlag:"/flags/Israel.svg",symbool:true,kleuren:["blauw","wit"]},
  {id:116,naam:"Japan",continent:"Azië",hoofdstad:"Tokio",vlag:"/flags/Japan.svg",symbool:false,kleuren:["wit","rood"]},
  {id:117,naam:"Jemen",continent:"Azië",hoofdstad:"Sanaa",vlag:"/flags/Jemen.svg",symbool:false,kleuren:["rood","wit","zwart"]},
  {id:118,naam:"Jordanië",continent:"Azië",hoofdstad:"Amman",vlag:"/flags/Jordanie.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:119,naam:"Kirgizië",continent:"Azië",hoofdstad:"Bisjkek",vlag:"/flags/Kirgizie.svg",symbool:true,kleuren:["rood","geel"]},
  {id:120,naam:"Koeweit",continent:"Azië",hoofdstad:"Koeweit-Stad",vlag:"/flags/Koeweit.svg",symbool:false,kleuren:["groen","wit","rood","zwart"]},
  {id:121,naam:"Laos",continent:"Azië",hoofdstad:"Vientiane",vlag:"/flags/Laos.svg",symbool:false,kleuren:["rood","blauw","wit"]},
  {id:122,naam:"Libanon",continent:"Azië",hoofdstad:"Beiroet",vlag:"/flags/Libanon.svg",symbool:true,kleuren:["rood","wit","groen"]},
  {id:123,naam:"Malediven",continent:"Azië",hoofdstad:"Malé",vlag:"/flags/Malediven.svg",symbool:true,kleuren:["rood","groen","wit"]},
  {id:124,naam:"Maleisië",continent:"Azië",hoofdstad:"Kuala Lumpur",vlag:"/flags/Maleisie.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:125,naam:"Mongolië",continent:"Azië",hoofdstad:"Ulaanbaatar",vlag:"/flags/Mongolie.svg",symbool:true,kleuren:["rood","blauw","geel"]},
  {id:126,naam:"Myanmar",continent:"Azië",hoofdstad:"Naypyidaw",vlag:"/flags/Myanmar.svg",symbool:true,kleuren:["geel","groen","rood"]},
  {id:127,naam:"Nepal",continent:"Azië",hoofdstad:"Kathmandu",vlag:"/flags/Nepal.svg",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:128,naam:"Noord-Korea",continent:"Azië",hoofdstad:"Pyongyang",vlag:"/flags/Noord-Korea.svg",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:129,naam:"Oezbekistan",continent:"Azië",hoofdstad:"Tasjkent",vlag:"/flags/Oezbekistan.svg",symbool:true,kleuren:["blauw","wit","groen"]},
  {id:130,naam:"Oman",continent:"Azië",hoofdstad:"Muscat",vlag:"/flags/Oman.svg",symbool:true,kleuren:["wit","rood","groen"]},
  {id:131,naam:"Oost-Timor",continent:"Azië",hoofdstad:"Dili",vlag:"/flags/Oost-Timor.svg",symbool:true,kleuren:["zwart","geel","rood"]},
  {id:132,naam:"Pakistan",continent:"Azië",hoofdstad:"Islamabad",vlag:"/flags/Pakistan.svg",symbool:true,kleuren:["wit","groen"]},
  {id:133,naam:"Palestina",continent:"Azië",hoofdstad:"Ramallah",vlag:"/flags/Palestina.svg",symbool:false,kleuren:["meerkleurig"]},
  {id:134,naam:"Qatar",continent:"Azië",hoofdstad:"Doha",vlag:"/flags/Qatar.svg",symbool:false,kleuren:["rood","wit"]},
  {id:135,naam:"Saoedi-Arabië",continent:"Azië",hoofdstad:"Riyad",vlag:"/flags/Saoedi-Arabie.svg",symbool:true,kleuren:["groen","wit"]},
  {id:136,naam:"Singapore",continent:"Azië",hoofdstad:"Singapore",vlag:"/flags/Singapore.svg",symbool:true,kleuren:["rood","wit"]},
  {id:137,naam:"Sri Lanka",continent:"Azië",hoofdstad:"Sri Jayewardenepura Kotte",vlag:"/flags/Sri_Lanka.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:138,naam:"Syrië",continent:"Azië",hoofdstad:"Damascus",vlag:"/flags/Syrie.svg",symbool:true,kleuren:["rood","wit","zwart"]},
  {id:139,naam:"Tadzjikistan",continent:"Azië",hoofdstad:"Dusjanbe",vlag:"/flags/Tadzjikistan.svg",symbool:true,kleuren:["rood","wit","groen"]},
  {id:140,naam:"Thailand",continent:"Azië",hoofdstad:"Bangkok",vlag:"/flags/Thailand.svg",symbool:false,kleuren:["wit","blauw","rood"]},
  {id:141,naam:"Turkmenistan",continent:"Azië",hoofdstad:"Asjchabad",vlag:"/flags/Turkmenistan.svg",symbool:true,kleuren:["groen","wit","rood"]},
  {id:142,naam:"VAE",continent:"Azië",hoofdstad:"Abu Dhabi",vlag:"/flags/VAE.svg",symbool:false,kleuren:["meerkleurig"]},
  {id:143,naam:"Vietnam",continent:"Azië",hoofdstad:"Hanoi",vlag:"/flags/Vietnam.svg",symbool:true,kleuren:["geel","rood"]},
  {id:144,naam:"Zuid-Korea",continent:"Azië",hoofdstad:"Seoel",vlag:"/flags/Zuid-Korea.svg",symbool:true,kleuren:["wit","blauw","rood"]},
  {id:145,naam:"Algerije",continent:"Afrika",hoofdstad:"Algiers",vlag:"/flags/Algerije.svg",symbool:true,kleuren:["groen","rood","wit"]},
  {id:146,naam:"Angola",continent:"Afrika",hoofdstad:"Luanda",vlag:"/flags/Angola.svg",symbool:true,kleuren:["rood","geel","zwart"]},
  {id:147,naam:"Benin",continent:"Afrika",hoofdstad:"Porto-Novo",vlag:"/flags/Benin.svg",symbool:false,kleuren:["groen","rood","geel"]},
  {id:148,naam:"Botswana",continent:"Afrika",hoofdstad:"Gaborone",vlag:"/flags/Botswana.svg",symbool:false,kleuren:["blauw","wit","zwart"]},
  {id:149,naam:"Burkina Faso",continent:"Afrika",hoofdstad:"Ouagadougou",vlag:"/flags/Burkina_Faso.svg",symbool:true,kleuren:["rood","geel","groen"]},
  {id:150,naam:"Burundi",continent:"Afrika",hoofdstad:"Gitega",vlag:"/flags/Burundi.svg",symbool:true,kleuren:["groen","rood","wit"]},
  {id:151,naam:"Centraal-Afrikaanse Republiek",continent:"Afrika",hoofdstad:"Bangui",vlag:"/flags/Centraal-Afrikaanse_Republiek.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:152,naam:"Comoren",continent:"Afrika",hoofdstad:"Moroni",vlag:"/flags/Comoren.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:153,naam:"Congo-Brazzaville",continent:"Afrika",hoofdstad:"Brazzaville",vlag:"/flags/Congo-Brazzaville.svg",symbool:false,kleuren:["groen","geel","rood"]},
  {id:154,naam:"Congo-Kinshasa",continent:"Afrika",hoofdstad:"Kinshasa",vlag:"/flags/Congo-Kinshasa.svg",symbool:true,kleuren:["blauw","geel","rood"]},
  {id:155,naam:"Djibouti",continent:"Afrika",hoofdstad:"Djibouti",vlag:"/flags/Djibouti.svg",symbool:true,kleuren:["blauw","wit","groen"]},
  {id:156,naam:"Equatoriaal-Guinea",continent:"Afrika",hoofdstad:"Malabo",vlag:"/flags/Equatoriaal-Guinea.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:157,naam:"Eritrea",continent:"Afrika",hoofdstad:"Asmara",vlag:"/flags/Eritrea.svg",symbool:true,kleuren:["rood","groen","blauw"]},
  {id:158,naam:"Ethiopië",continent:"Afrika",hoofdstad:"Addis Abeba",vlag:"/flags/Ethiopie.svg",symbool:true,kleuren:["groen","geel","rood"]},
  {id:159,naam:"Gabon",continent:"Afrika",hoofdstad:"Libreville",vlag:"/flags/Gabon.svg",symbool:false,kleuren:["groen","geel","blauw"]},
  {id:160,naam:"Gambia",continent:"Afrika",hoofdstad:"Banjul",vlag:"/flags/Gambia.svg",symbool:false,kleuren:["rood","blauw","groen"]},
  {id:161,naam:"Ghana",continent:"Afrika",hoofdstad:"Accra",vlag:"/flags/Ghana.svg",symbool:true,kleuren:["rood","geel","groen"]},
  {id:162,naam:"Guinee",continent:"Afrika",hoofdstad:"Conakry",vlag:"/flags/Guinee.svg",symbool:false,kleuren:["rood","geel","groen"]},
  {id:163,naam:"Guinee-Bissau",continent:"Afrika",hoofdstad:"Bissau",vlag:"/flags/Guinee-Bissau.svg",symbool:true,kleuren:["rood","geel","groen"]},
  {id:164,naam:"Ivoorkust",continent:"Afrika",hoofdstad:"Yamoussoukro",vlag:"/flags/Ivoorkust.svg",symbool:false,kleuren:["oranje","wit","groen"]},
  {id:165,naam:"Kaapverdië",continent:"Afrika",hoofdstad:"Praia",vlag:"/flags/Kaapverdie.svg",symbool:true,kleuren:["blauw","wit","rood"]},
  {id:166,naam:"Kenia",continent:"Afrika",hoofdstad:"Nairobi",vlag:"/flags/Kenia.svg",symbool:true,kleuren:["zwart","rood","groen"]},
  {id:167,naam:"Liberia",continent:"Afrika",hoofdstad:"Monrovia",vlag:"/flags/Liberia.svg",symbool:true,kleuren:["rood","wit","blauw"]},
  {id:168,naam:"Libië",continent:"Afrika",hoofdstad:"Tripoli",vlag:"/flags/Libie.svg",symbool:true,kleuren:["rood","zwart","groen"]},
  {id:169,naam:"Madagaskar",continent:"Afrika",hoofdstad:"Antananarivo",vlag:"/flags/Madagaskar.svg",symbool:false,kleuren:["wit","rood","groen"]},
  {id:170,naam:"Malawi",continent:"Afrika",hoofdstad:"Lilongwe",vlag:"/flags/Malawi.svg",symbool:true,kleuren:["zwart","rood","groen"]},
  {id:171,naam:"Mali",continent:"Afrika",hoofdstad:"Bamako",vlag:"/flags/Mali.svg",symbool:false,kleuren:["groen","geel","rood"]},
  {id:172,naam:"Marokko",continent:"Afrika",hoofdstad:"Rabat",vlag:"/flags/Marokko.svg",symbool:true,kleuren:["rood","groen"]},
  {id:173,naam:"Mozambique",continent:"Afrika",hoofdstad:"Maputo",vlag:"/flags/Mozambique.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:174,naam:"Niger",continent:"Afrika",hoofdstad:"Niamey",vlag:"/flags/Niger.svg",symbool:true,kleuren:["oranje","wit","groen"]},
  {id:175,naam:"Nigeria",continent:"Afrika",hoofdstad:"Abuja",vlag:"/flags/Nigeria.svg",symbool:false,kleuren:["groen","wit"]},
  {id:176,naam:"Oeganda",continent:"Afrika",hoofdstad:"Kampala",vlag:"/flags/Oeganda.svg",symbool:true,kleuren:["geel","rood","zwart"]},
  {id:177,naam:"Rwanda",continent:"Afrika",hoofdstad:"Kigali",vlag:"/flags/Rwanda.svg",symbool:true,kleuren:["blauw","geel","groen"]},
  {id:178,naam:"Sao Tomé en Príncipe",continent:"Afrika",hoofdstad:"São Tomé",vlag:"/flags/Sao_Tome_en_Principe.svg",symbool:true,kleuren:["rood","groen","geel"]},
  {id:179,naam:"Senegal",continent:"Afrika",hoofdstad:"Dakar",vlag:"/flags/Senegal.svg",symbool:true,kleuren:["groen","geel","rood"]},
  {id:180,naam:"Sierra Leone",continent:"Afrika",hoofdstad:"Freetown",vlag:"/flags/Sierra_Leone.svg",symbool:false,kleuren:["groen","wit","blauw"]},
  {id:181,naam:"Soedan",continent:"Afrika",hoofdstad:"Khartoem",vlag:"/flags/Soedan.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:182,naam:"Somalië",continent:"Afrika",hoofdstad:"Mogadishu",vlag:"/flags/Somalie.svg",symbool:true,kleuren:["blauw","wit"]},
  {id:183,naam:"Tanzania",continent:"Afrika",hoofdstad:"Dodoma",vlag:"/flags/Tanzania.svg",symbool:false,kleuren:["groen","zwart","blauw"]},
  {id:184,naam:"Togo",continent:"Afrika",hoofdstad:"Lomé",vlag:"/flags/Togo.svg",symbool:true,kleuren:["rood","groen","geel"]},
  {id:185,naam:"Tsjaad",continent:"Afrika",hoofdstad:"N'Djamena",vlag:"/flags/Tsjaad.svg",symbool:false,kleuren:["blauw","geel","rood"]},
  {id:186,naam:"Tunesië",continent:"Afrika",hoofdstad:"Tunis",vlag:"/flags/Tunesie.svg",symbool:true,kleuren:["rood","wit"]},
  {id:187,naam:"Zambia",continent:"Afrika",hoofdstad:"Lusaka",vlag:"/flags/Zambia.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:188,naam:"Zimbabwe",continent:"Afrika",hoofdstad:"Harare",vlag:"/flags/Zimbabwe.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:189,naam:"Zuid-Afrika",continent:"Afrika",hoofdstad:"Kaapstad",vlag:"/flags/Zuid-Afrika.svg",symbool:false,kleuren:["meerkleurig"]},
  {id:190,naam:"Zuid-Soedan",continent:"Afrika",hoofdstad:"Juba",vlag:"/flags/Zuid-Soedan.svg",symbool:true,kleuren:["meerkleurig"]},
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

// ── STORAGE ──
function loadRecords(lang) {
  try { return JSON.parse(localStorage.getItem(`flagquiz_records_${lang}`) || "[]"); } catch { return []; }
}
function saveRecord(lang, name, score, mode) {
  const records = loadRecords(lang);
  records.push({ name, score, mode, date: new Date().toLocaleDateString() });
  records.sort((a, b) => b.score - a.score);
  localStorage.setItem(`flagquiz_records_${lang}`, JSON.stringify(records.slice(0, 20)));
}

// ── SEO HEAD UPDATER ──
function useSeoHead(lang, t) {
  useEffect(() => {
    const meta = getLangMeta(lang);
    document.title = t.siteTitle + " – " + t.tagline;
    setMeta("description", t.siteDesc);
    setMeta("keywords", t.siteKeywords);
    setAttr('link[rel="canonical"]', "href", `https://flagquiz.io${meta.path}`);
    document.documentElement.lang = lang;
    document.documentElement.dir = meta.rtl ? "rtl" : "ltr";
    // hreflang alternate links
    document.querySelectorAll('link[hreflang]').forEach(el => el.remove());
    LANGUAGES.forEach(l => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = l.code;
      link.href = `https://flagquiz.io${l.path}`;
      document.head.appendChild(link);
    });
  }, [lang, t]);
}
function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
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
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:800,color}}>{timeLeft}</div>
    </div>
  );
}

// ── LIVES ──
function Lives({count}) {
  return <span>{[0,1].map(i=><span key={i} style={{fontSize:18,opacity:i<count?1:0.2}}>{i<count?"❤️":"🖤"}</span>)}</span>;
}

// ── LANGUAGE SWITCHER ──
function LangSwitcher({ currentLang }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const current = getLangMeta(currentLang);
  return (
    <div style={{position:"relative"}}>
      <button onClick={() => setOpen(o => !o)}
        style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.08)",color:"#fff",cursor:"pointer",fontSize:13,fontWeight:600}}>
        <span>{current.flag}</span>
        <span style={{maxWidth:60,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{current.name}</span>
        <span style={{fontSize:10,opacity:.6}}>{open?"▲":"▼"}</span>
      </button>
      {open && (
        <>
          <div style={{position:"fixed",inset:0,zIndex:49}} onClick={() => setOpen(false)}/>
          <div style={{position:"absolute",right:0,top:"calc(100% + 6px)",background:"#0f1629",border:"1px solid rgba(255,255,255,0.15)",borderRadius:10,overflow:"hidden",zIndex:50,minWidth:160,boxShadow:"0 8px 32px rgba(0,0,0,.5)"}}>
            {LANGUAGES.map(l => (
              <button key={l.code}
                onClick={() => { navigate(l.path); setOpen(false); }}
                style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 16px",border:"none",background:l.code===currentLang?"rgba(74,144,217,0.2)":"transparent",color:l.code===currentLang?"#4a90d9":"#ccc",cursor:"pointer",fontSize:13,fontWeight:l.code===currentLang?700:400,textAlign:"left"}}>
                <span style={{fontSize:16}}>{l.flag}</span>
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
function Leaderboard({ lang, t, onClose }) {
  const records = loadRecords(lang);
  const solo = records.filter(r => r.mode === "solo").slice(0, 8);
  const duel = records.filter(r => r.mode === "duel").slice(0, 8);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:150,padding:20}}>
      <div style={{background:"#0f1629",borderRadius:20,padding:32,maxWidth:560,width:"100%",border:"1px solid rgba(255,255,255,0.12)"}}>
        <h2 style={{margin:"0 0 24px",fontSize:22,textAlign:"center"}}>{t.leaderboardTitle}</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
          {[[t.soloTab, solo],[t.duelTab, duel]].map(([label, list]) => (
            <div key={label}>
              <div style={{fontWeight:700,fontSize:12,color:"#aaa",marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>{label}</div>
              {list.length===0 && <div style={{color:"#444",fontSize:13}}>{t.noScores}</div>}
              {list.map((r,i) => (
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                  <span style={{fontSize:13}}><span style={{color:["#f1c40f","#aaa","#cd7f32"][i]||"#555",fontWeight:700,marginRight:6}}>{i+1}.</span>{r.name}</span>
                  <span style={{fontWeight:700,color:"#e94560",fontSize:14}}>{r.score.toLocaleString()}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{marginTop:24,width:"100%",padding:"12px",borderRadius:10,border:"none",background:"rgba(255,255,255,0.08)",color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer"}}>{t.close}</button>
      </div>
    </div>
  );
}

// ── SAVE SCORE MODAL ──
function SaveScore({ score, mode, lang, t, onSave, onSkip }) {
  const [name, setName] = useState("");
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:160,padding:20}}>
      <div style={{background:"#0f1629",borderRadius:20,padding:32,maxWidth:400,width:"100%",border:"1px solid rgba(255,255,255,0.15)",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:8}}>🎉</div>
        <h2 style={{margin:"0 0 4px",fontSize:22}}>{t.saveTitle}</h2>
        <p style={{color:"#aaa",marginBottom:20,fontSize:13}}>{t.saveDesc}</p>
        <div style={{fontSize:32,fontWeight:800,color:"#f1c40f",marginBottom:20}}>{score.toLocaleString()} {t.pts}</div>
        <input autoFocus
          style={{width:"100%",padding:"12px 14px",borderRadius:10,border:"1px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.08)",color:"#fff",fontSize:16,outline:"none",marginBottom:14,boxSizing:"border-box"}}
          placeholder={t.namePlaceholder} value={name} onChange={e=>setName(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&name.trim()&&onSave(name.trim())}/>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>name.trim()&&onSave(name.trim())} disabled={!name.trim()}
            style={{flex:1,padding:"12px",borderRadius:10,border:"none",background:name.trim()?"#e94560":"rgba(255,255,255,0.08)",color:"#fff",fontSize:15,fontWeight:700,cursor:name.trim()?"pointer":"default"}}>
            {t.save}
          </button>
          <button onClick={onSkip} style={{padding:"12px 18px",borderRadius:10,border:"none",background:"rgba(255,255,255,0.07)",color:"#aaa",fontSize:13,cursor:"pointer"}}>{t.skip}</button>
        </div>
      </div>
    </div>
  );
}

// ── COLOR TAG ──
function ColorTag({ c }) {
  const m={rood:"#e94560",blauw:"#4a90d9",groen:"#27ae60",geel:"#f1c40f",wit:"#ecf0f1",zwart:"#34495e",oranje:"#e67e22",lichtblauw:"#5dade2",meerkleurig:"#9b59b6",
    red:"#e94560",blue:"#4a90d9",green:"#27ae60",yellow:"#f1c40f",white:"#ecf0f1",black:"#34495e",orange:"#e67e22"};
  return <span style={{display:"inline-block",padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:m[c]||"#555",color:["wit","geel","lichtblauw","white","yellow"].includes(c)?"#222":"#fff",margin:"2px"}}>{c}</span>;
}

// ── MAIN APP ──
export default function App({ langCode }) {
  const t = getLang(langCode);
  const langMeta = getLangMeta(langCode);
  useSeoHead(langCode, t);

  const [mode, setMode] = useState("home");
  const [continent, setContinent] = useState("Alle");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [records, setRecords] = useState(() => loadRecords(langCode));
  const [showSave, setShowSave] = useState(false);
  const [pendingScore, setPendingScore] = useState(null);
  const [pendingMode, setPendingMode] = useState(null);

  // Reload records when language changes
  useEffect(() => { setRecords(loadRecords(langCode)); }, [langCode]);

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
    saveRecord(langCode, name, pendingScore, pendingMode);
    setRecords(loadRecords(langCode));
    setShowSave(false);
  }

  const names = [p1Name || `${t.player1?.split(" ")[0]} 1`, p2Name || `${t.player1?.split(" ")[0]} 2`];
  const playerColors = ["#e94560","#4a90d9"];
  const isRtl = langMeta.rtl;

  const st = {
    app: { minHeight:"100vh", background:"linear-gradient(135deg,#0a0e1a 0%,#111827 50%,#0a1628 100%)", color:"#fff", fontFamily:"'Segoe UI',system-ui,sans-serif", direction: isRtl?"rtl":"ltr" },
    header: { padding:"14px 24px", borderBottom:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 },
    logo: { fontSize:22, fontWeight:900, cursor:"pointer", background:"linear-gradient(90deg,#e94560,#4a90d9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:-0.5 },
    btn: (a) => ({ padding:"8px 16px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:600, fontSize:13, background: a?"#e94560":"rgba(255,255,255,0.09)", color:"#fff", transition:"all .2s", whiteSpace:"nowrap" }),
    input: { padding:"8px 12px", borderRadius:8, border:"1px solid rgba(255,255,255,0.18)", background:"rgba(255,255,255,0.07)", color:"#fff", fontSize:13, outline:"none", width:180 },
    select: { padding:"8px 12px", borderRadius:8, border:"1px solid rgba(255,255,255,0.18)", background:"rgba(15,22,41,0.95)", color:"#fff", fontSize:13, outline:"none" },
    grid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))", gap:14, padding:"0 24px 32px" },
    card: { background:"rgba(255,255,255,0.05)", borderRadius:12, padding:14, cursor:"pointer", border:"1px solid rgba(255,255,255,0.07)", transition:"all .2s" },
    modal: { position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, padding:20 },
    box: { background:"#0f1629", borderRadius:16, padding:28, maxWidth:420, width:"100%", border:"1px solid rgba(255,255,255,0.12)" },
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
        <LangSwitcher currentLang={langCode} />
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"80vh",padding:24}}>
        <div style={{...st.box,maxWidth:460,textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:10}}>⚔️</div>
          <h2 style={{margin:"0 0 6px",fontSize:26}}>{t.duelSetupTitle}</h2>
          <p style={{color:"#aaa",marginBottom:6,fontSize:14}}>{t.duelSetupDesc}</p>
          <p style={{color:"#555",marginBottom:26,fontSize:13}}>{t.duelSetupRule}</p>
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:26}}>
            {[["🔴","#e94560",p1Name,setP1Name,t.player1],["🔵","#4a90d9",p2Name,setP2Name,t.player2]].map(([icon,color,val,set,ph])=>(
              <div key={ph} style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:20}}>{icon}</span>
                <input style={{...st.input,width:"100%",border:`2px solid ${color}`}} placeholder={ph} value={val} onChange={e=>set(e.target.value)} onKeyDown={e=>e.key==="Enter"&&startDuel()}/>
              </div>
            ))}
          </div>
          <button style={{...st.btn(true),padding:"13px 36px",fontSize:16,borderRadius:12,width:"100%"}} onClick={startDuel}>{t.startDuel}</button>
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
          <LangSwitcher currentLang={langCode}/>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"80vh",padding:24}}>
          <div style={{...st.box,textAlign:"center",maxWidth:500}}>
            <div style={{fontSize:68,marginBottom:8}}>🏆</div>
            <h2 style={{margin:"0 0 4px",fontSize:32,color:playerColors[winner]}}>{winnerName}</h2>
            <p style={{color:"#aaa",fontSize:16,marginBottom:6}}>{t.duelWins}</p>
            <p style={{color:"#444",fontSize:13,marginBottom:26}}>{loserName} {t.duelLoserNote}</p>
            <div style={{display:"flex",justifyContent:"center",gap:14,marginBottom:26}}>
              {[0,1].map(i=>(
                <div key={i} style={{background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"12px 18px",border:`2px solid ${i===winner?"#f1c40f":"rgba(255,255,255,0.07)"}`}}>
                  <div style={{fontSize:11,color:"#aaa",marginBottom:3}}>{names[i]}</div>
                  <div style={{fontSize:26,fontWeight:800,color:playerColors[i]}}>{duelScores[i].toLocaleString()}</div>
                  <div style={{fontSize:11,color:"#555"}}>{t.pts}</div>
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
            <LangSwitcher currentLang={langCode}/>
            <button style={st.btn(false)} onClick={()=>setMode("home")}>{t.stop}</button>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:10,padding:"12px 20px 0",flexWrap:"wrap"}}>
          {[0,1].map(i=>(
            <div key={i} style={{flex:1,maxWidth:210,background:i===cp?`${playerColors[i]}18`:"rgba(255,255,255,0.03)",border:`2px solid ${i===cp?playerColors[i]:"rgba(255,255,255,0.07)"}`,borderRadius:12,padding:"10px 14px",transition:"all .3s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontWeight:700,fontSize:13,color:i===cp?playerColors[i]:"#555"}}>{i===cp?"▶ ":""}{names[i]}</span>
                <Lives count={lives[i]}/>
              </div>
              <div style={{fontSize:20,fontWeight:800,color:playerColors[i],marginTop:2}}>{duelScores[i].toLocaleString()} <span style={{fontSize:10,color:"#444",fontWeight:400}}>{t.pts}</span></div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"18px 20px 36px",gap:18}}>
          <div style={{background:`${playerColors[cp]}18`,border:`1px solid ${playerColors[cp]}44`,borderRadius:20,padding:"5px 18px",fontSize:13,fontWeight:700,color:playerColors[cp]}}>
            {names[cp]} {t.yourTurn}
          </div>
          <div style={{background:"rgba(255,255,255,0.04)",borderRadius:16,padding:"18px 22px",width:"100%",maxWidth:480,textAlign:"center"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:12}}>
              <TimerRing timeLeft={duelTimeLeft}/>
              <div style={{textAlign:"left"}}>
                <div style={{fontSize:11,color:"#555",textTransform:"uppercase",letterSpacing:1}}>{t.fasterMorePts}</div>
                <div style={{fontSize:12,color:"#aaa",marginTop:2}}>{t.maxPts}</div>
              </div>
            </div>
            <img src={current.vlag} alt="flag" style={{width:"100%",maxWidth:260,aspectRatio:"3/2",objectFit:"contain",borderRadius:8,background:"rgba(255,255,255,0.04)"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,width:"100%",maxWidth:480}}>
            {duelOptions.map(opt=>{
              let bg="rgba(255,255,255,0.07)";
              if(duelAnswer!==null){if(opt.id===current.id)bg="#27ae60";else if(opt.id===duelAnswer)bg="#e94560";}
              return <button key={opt.id} onClick={()=>handleDuelAnswer(opt)} style={{padding:"12px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:bg,color:"#fff",fontSize:14,fontWeight:600,cursor:duelAnswer?"default":"pointer",transition:"background .25s"}}>{opt.naam}</button>;
            })}
          </div>
          {duelAnswer !== null && !duelDone && (
            <div style={{textAlign:"center"}}>
              {isTimeout ? <p style={{color:"#f1c40f",fontWeight:700,fontSize:14,margin:"0 0 10px"}}>⏰ {t.timeout} <strong>{current.naam}</strong></p>
               : isCorrect ? <p style={{color:"#27ae60",fontWeight:700,fontSize:14,margin:"0 0 10px"}}>✓ {t.correct.split("!")[0]}! <span style={{color:"#f1c40f"}}>+{duelLastPoints} {t.pts}</span></p>
               : <p style={{color:"#e94560",fontWeight:700,fontSize:14,margin:"0 0 10px"}}>✗ {t.wrong} <strong>{current.naam}</strong>{lives[cp]>0?`. ${lives[cp]} ${lives[cp]===1?t.lifeLeft:t.livesLeft}.`:""}</p>}
              <button style={{...st.btn(true),padding:"10px 26px",fontSize:14}} onClick={nextDuelQuestion}>
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
          <LangSwitcher currentLang={langCode}/>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"80vh",padding:24}}>
          <div style={{...st.box,textAlign:"center",maxWidth:460}}>
            <div style={{fontSize:60,marginBottom:10}}>{pct>=80?"🏆":pct>=50?"🎯":"📚"}</div>
            <h2 style={{margin:"0 0 4px",fontSize:26}}>{t.quizDone}</h2>
            <p style={{color:"#aaa",marginBottom:4,fontSize:14}}>{t.totalScore} <strong style={{color:"#fff",fontSize:17}}>{score.toLocaleString()} {t.pts}</strong></p>
            <p style={{color:"#444",marginBottom:22,fontSize:12}}>{t.maxPossible} {(quizList.length*100).toLocaleString()} {t.points}</p>
            <div style={{fontSize:42,fontWeight:800,color:"#e94560",marginBottom:26}}>{pct}%</div>
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
            <span style={{color:"#555",fontSize:12}}>{t.questionOf} {quizIndex+1} {t.of} {quizList.length}</span>
            <span style={{fontWeight:800,fontSize:15,color:"#f1c40f"}}>{score.toLocaleString()} {t.pts}</span>
            <LangSwitcher currentLang={langCode}/>
            <button style={st.btn(false)} onClick={()=>setMode("home")}>{t.stop}</button>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"28px 20px",gap:20}}>
          <div style={{background:"rgba(255,255,255,0.04)",borderRadius:16,padding:"18px 22px",width:"100%",maxWidth:480,textAlign:"center"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:12}}>
              <TimerRing timeLeft={timeLeft}/>
              <div style={{textAlign:"left"}}>
                <div style={{fontSize:11,color:"#555",textTransform:"uppercase",letterSpacing:1}}>{t.fasterMorePts}</div>
                <div style={{fontSize:12,color:"#aaa",marginTop:2}}>
                  {quizAnswer === null
                    ? <>{t.currentPts} <strong style={{color:"#fff"}}>{calcPoints(timeLeft)} {t.pts}</strong></>
                    : lastPoints > 0 ? <span style={{color:"#27ae60",fontWeight:700}}>+{lastPoints} {t.earnedPts}</span>
                    : <span style={{color:"#e94560"}}>0 {t.pts}</span>}
                </div>
              </div>
            </div>
            <p style={{color:"#666",margin:"0 0 12px",fontSize:13}}>{t.quizTitle}</p>
            <img src={current.vlag} alt="flag" style={{width:"100%",maxWidth:260,aspectRatio:"3/2",objectFit:"contain",borderRadius:8,background:"rgba(255,255,255,0.04)"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,width:"100%",maxWidth:480}}>
            {quizOptions.map(opt=>{
              let bg="rgba(255,255,255,0.07)";
              if(quizAnswer!==null){if(opt.id===current.id)bg="#27ae60";else if(opt.id===quizAnswer)bg="#e94560";}
              return <button key={opt.id} onClick={()=>handleAnswer(opt)} style={{padding:"12px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:bg,color:"#fff",fontSize:14,fontWeight:600,cursor:quizAnswer?"default":"pointer",transition:"background .25s"}}>{opt.naam}</button>;
            })}
          </div>
          {quizAnswer !== null && (
            <div style={{textAlign:"center"}}>
              {isTimeout ? <p style={{color:"#f1c40f",fontWeight:700,fontSize:14,margin:"0 0 10px"}}>⏰ {t.timeout} <strong>{current.naam}</strong></p>
               : isCorrect ? <p style={{color:"#27ae60",fontWeight:700,fontSize:14,margin:"0 0 10px"}}>✓ {t.correct} {countdown??0} {countdown===1?t.second:t.seconds}...</p>
               : <p style={{color:"#e94560",fontWeight:700,fontSize:14,margin:"0 0 10px"}}>✗ {t.wrong} <strong>{current.naam}</strong></p>}
              <button style={{...st.btn(true),padding:"10px 26px",fontSize:14}} onClick={nextQuestion}>
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
      {showLeaderboard && <Leaderboard lang={langCode} t={t} onClose={()=>setShowLeaderboard(false)}/>}

      <div style={st.header}>
        <span style={st.logo} onClick={()=>setMode("home")}>🌍 {t.siteTitle}</span>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          <button style={st.btn(mode==="browse")} onClick={()=>setMode("browse")}>{t.btnBrowse}</button>
          <button style={st.btn(false)} onClick={startQuiz}>{t.btnSolo}</button>
          <button style={{...st.btn(false),background:"linear-gradient(90deg,#e9456033,#4a90d933)",border:"1px solid rgba(255,255,255,0.12)"}} onClick={()=>setMode("duel-setup")}>{t.btnDuel}</button>
          <button style={{...st.btn(false),background:"rgba(241,196,15,0.12)",border:"1px solid rgba(241,196,15,0.25)",color:"#f1c40f"}} onClick={()=>setShowLeaderboard(true)}>{t.scores}</button>
          <LangSwitcher currentLang={langCode}/>
        </div>
      </div>

      {mode === "home" && (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"44px 20px 60px",textAlign:"center"}}>
          <div style={{fontSize:68,marginBottom:14}}>🌍</div>
          <h1 style={{fontSize:38,margin:"0 0 10px",fontWeight:900,lineHeight:1.1}}>{t.siteTitle}</h1>
          <p style={{color:"#4a90d9",fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>{t.tagline}</p>
          <p style={{color:"#aaa",fontSize:15,maxWidth:500,marginBottom:10,lineHeight:1.65}} dangerouslySetInnerHTML={{__html:t.heroText}}/>
          <p style={{color:"#444",fontSize:13,maxWidth:440,marginBottom:34,lineHeight:1.6}}>{t.subText}</p>

          <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom:44}}>
            <button style={{...st.btn(false),padding:"13px 26px",fontSize:15,borderRadius:12,background:"rgba(255,255,255,0.08)"}} onClick={()=>setMode("browse")}>🗺 {t.btnBrowse}</button>
            <button style={{...st.btn(true),padding:"13px 26px",fontSize:15,borderRadius:12}} onClick={startQuiz}>🎯 {t.btnSolo}</button>
            <button style={{padding:"13px 26px",fontSize:15,borderRadius:12,border:"none",cursor:"pointer",fontWeight:700,background:"linear-gradient(135deg,#e94560,#4a90d9)",color:"#fff"}} onClick={()=>setMode("duel-setup")}>⚔️ {t.btnDuel}</button>
          </div>

          {/* Feature cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:14,maxWidth:700,width:"100%",marginBottom:44}}>
            {[[" ⏱️",t.featureTimer,t.featureTimerDesc],["🌍",t.feature190,t.feature190Desc],["⚔️",t.featureDuel,t.featureDuelDesc],["🏆",t.featureScore,t.featureScoreDesc]].map(([icon,title,desc])=>(
              <div key={title} style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:"18px 16px",border:"1px solid rgba(255,255,255,0.06)",textAlign:"left"}}>
                <div style={{fontSize:26,marginBottom:8}}>{icon}</div>
                <h2 style={{margin:"0 0 5px",fontSize:14,fontWeight:700}}>{title}</h2>
                <p style={{margin:0,color:"#555",fontSize:12,lineHeight:1.5}}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Mini leaderboard */}
          {records.length > 0 && (
            <div style={{background:"rgba(255,255,255,0.04)",borderRadius:16,padding:"18px 24px",maxWidth:380,width:"100%",border:"1px solid rgba(255,255,255,0.07)",marginBottom:36}}>
              <div style={{fontSize:12,color:"#aaa",marginBottom:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>{t.topScores}</div>
              {records.slice(0,5).map((r,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.05)",fontSize:13}}>
                  <span><span style={{color:["#f1c40f","#aaa","#cd7f32"][i]||"#444",fontWeight:700,marginRight:6}}>{i+1}.</span>{r.name} <span style={{color:"#333",fontSize:10}}>({r.mode})</span></span>
                  <span style={{fontWeight:700,color:"#e94560"}}>{r.score.toLocaleString()}</span>
                </div>
              ))}
              <button onClick={()=>setShowLeaderboard(true)} style={{marginTop:10,fontSize:11,color:"#4a90d9",background:"none",border:"none",cursor:"pointer"}}>{t.allScores}</button>
            </div>
          )}

          {/* Language links for SEO */}
          <div style={{marginBottom:24,display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
            {LANGUAGES.map(l=>(
              <a key={l.code} href={l.path}
                style={{fontSize:11,padding:"3px 10px",borderRadius:12,background:"rgba(255,255,255,0.04)",color:"#444",textDecoration:"none",border:"1px solid rgba(255,255,255,0.06)"}}>
                {l.flag} {l.name}
              </a>
            ))}
          </div>

          {/* Continent links */}
          <div style={{marginBottom:12}}>
            <p style={{color:"#2a2a3a",fontSize:11,marginBottom:8}}>{t.continentPractice}</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
              {CONTINENTEN.filter(c=>c!=="Alle").map(c=>(
                <span key={c} style={{fontSize:11,background:"rgba(255,255,255,0.04)",padding:"3px 10px",borderRadius:14,color:"#333",border:"1px solid rgba(255,255,255,0.05)"}}>
                  {FLAGS.filter(f=>f.continent===c).length} {t.flagsOf} {contLabel(c)}
                </span>
              ))}
            </div>
          </div>
          <p style={{color:"#1a1a2e",fontSize:10,maxWidth:520,lineHeight:1.6,marginTop:6}}>{t.seoCopy}</p>
        </div>
      )}

      {mode === "browse" && (
        <>
          <div style={{padding:"12px 20px",display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
            <input style={st.input} placeholder={t.searchPlaceholder} value={search} onChange={e=>setSearch(e.target.value)}/>
            <select style={st.select} value={continent} onChange={e=>setContinent(e.target.value)}>
              {CONTINENTEN.map(c=><option key={c} value={c}>{contLabel(c)}</option>)}
            </select>
            <span style={{color:"#555",fontSize:12}}>{filtered.length} {t.countries}</span>
          </div>
          <div style={st.grid}>
            {filtered.map(f=>(
              <div key={f.id} style={st.card} onClick={()=>setSelected(f)}>
                <img src={f.vlag} alt={f.naam} style={{width:"100%",aspectRatio:"3/2",objectFit:"cover",borderRadius:6,marginBottom:8,background:"rgba(255,255,255,0.04)"}} loading="lazy"/>
                <div style={{fontSize:12,fontWeight:600,textAlign:"center",color:"#ddd"}}>{f.naam}</div>
                <div style={{textAlign:"center",fontSize:10,color:"#555",marginTop:3}}>{contLabel(f.continent)}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {selected && (
        <div style={st.modal} onClick={()=>setSelected(null)}>
          <div style={st.box} onClick={e=>e.stopPropagation()}>
            <img src={selected.vlag} alt={selected.naam} style={{width:"100%",borderRadius:10,marginBottom:18,aspectRatio:"3/2",objectFit:"contain",background:"rgba(255,255,255,0.04)"}}/>
            <h2 style={{margin:"0 0 6px",fontSize:22}}>{selected.naam}</h2>
            <p style={{color:"#aaa",margin:"0 0 5px",fontSize:13}}>🏛 {t.capital}: <strong style={{color:"#fff"}}>{selected.hoofdstad}</strong></p>
            <p style={{color:"#aaa",margin:"0 0 10px",fontSize:13}}>🌍 {t.continent}: <strong style={{color:"#fff"}}>{contLabel(selected.continent)}</strong></p>
            <p style={{color:"#555",margin:"0 0 6px",fontSize:11}}>{t.colors}:</p>
            <div>{selected.kleuren.map(k=><ColorTag key={k} c={k}/>)}</div>
            {selected.symbool && <p style={{color:"#444",fontSize:11,marginTop:8}}>{t.hasSymbol}</p>}
            <button style={{...st.btn(false),marginTop:16,width:"100%"}} onClick={()=>setSelected(null)}>{t.close}</button>
          </div>
        </div>
      )}
    </div>
  );
}
