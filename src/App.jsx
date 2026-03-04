import { useState, useMemo, useEffect, useCallback } from "react";

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

// ── CONFETTI COMPONENT ──
function Confetti() {
  const pieces = Array.from({length: 60}, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    color: ["#e94560","#f1c40f","#27ae60","#4a90d9","#e67e22","#9b59b6"][Math.floor(Math.random()*6)],
    size: 6 + Math.random() * 8,
  }));
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:200,overflow:"hidden"}}>
      <style>{`
        @keyframes fall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
      `}</style>
      {pieces.map(p => (
        <div key={p.id} style={{
          position:"absolute", left:`${p.x}%`, top:0,
          width:p.size, height:p.size, background:p.color, borderRadius:p.size>10?"50%":"2px",
          animation:`fall ${p.duration}s ${p.delay}s ease-in forwards`
        }}/>
      ))}
    </div>
  );
}

// ── HEARTBEAT / LIVES DISPLAY ──
function Lives({count, color}) {
  return (
    <span>
      {[0,1].map(i => (
        <span key={i} style={{fontSize:20, opacity: i < count ? 1 : 0.2, filter: i < count ? "none" : "grayscale(1)"}}>
          {i < count ? "❤️" : "🖤"}
        </span>
      ))}
    </span>
  );
}

export default function App() {
  const [mode, setMode] = useState("home");
  const [continent, setContinent] = useState("Alle");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // Solo quiz state
  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [countdown, setCountdown] = useState(null);

  // 2-player state
  const [p1Name, setP1Name] = useState("");
  const [p2Name, setP2Name] = useState("");
  const [duelList, setDuelList] = useState([]);
  const [duelIndex, setDuelIndex] = useState(0);
  const [duelOptions, setDuelOptions] = useState([]);
  const [duelAnswer, setDuelAnswer] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(0); // 0 = p1, 1 = p2
  const [lives, setLives] = useState([2, 2]); // 2 lives each
  const [scores, setScores] = useState([0, 0]);
  const [duelDone, setDuelDone] = useState(false);
  const [winner, setWinner] = useState(null);

  const filtered = useMemo(() => FLAGS.filter(f => {
    const matchC = continent === "Alle" || f.continent === continent;
    const matchS = f.naam.toLowerCase().includes(search.toLowerCase());
    return matchC && matchS;
  }), [continent, search]);

  const pool = useMemo(() =>
    continent === "Alle" ? FLAGS : FLAGS.filter(f => f.continent === continent),
    [continent]
  );

  // ── SOLO QUIZ LOGIC ──
  const nextQuestion = useCallback(() => {
    setCountdown(null);
    setQuizIndex(prev => {
      const next = prev + 1;
      if (next >= quizList.length) { setQuizDone(true); return prev; }
      setQuizOptions(getOptions(quizList[next], pool));
      setQuizAnswer(null);
      return next;
    });
  }, [quizList, pool]);

  useEffect(() => {
    if (quizAnswer === null || quizList.length === 0) return;
    if (quizAnswer !== quizList[quizIndex].id) return;
    setCountdown(3);
    const iv = setInterval(() => setCountdown(c => c > 1 ? c - 1 : null), 1000);
    const to = setTimeout(nextQuestion, 3000);
    return () => { clearInterval(iv); clearTimeout(to); };
  }, [quizAnswer, quizIndex, quizList, nextQuestion]);

  function startQuiz() {
    const list = shuffle(pool).slice(0, 20);
    setQuizList(list);
    setQuizIndex(0);
    setQuizOptions(getOptions(list[0], pool));
    setQuizAnswer(null);
    setScore(0);
    setQuizDone(false);
    setCountdown(null);
    setMode("quiz");
  }

  function handleAnswer(flag) {
    if (quizAnswer !== null) return;
    if (flag.id === quizList[quizIndex].id) setScore(s => s + 1);
    setQuizAnswer(flag.id);
  }

  // ── DUEL LOGIC ──
  function startDuel() {
    const list = shuffle(FLAGS);
    setDuelList(list);
    setDuelIndex(0);
    setDuelOptions(getOptions(list[0], FLAGS));
    setDuelAnswer(null);
    setCurrentPlayer(0);
    setLives([2, 2]);
    setScores([0, 0]);
    setDuelDone(false);
    setWinner(null);
    setMode("duel");
  }

  function handleDuelAnswer(flag) {
    if (duelAnswer !== null) return;
    const correct = flag.id === duelList[duelIndex].id;
    setDuelAnswer(flag.id);

    const newScores = [...scores];
    const newLives = [...lives];

    if (correct) {
      newScores[currentPlayer]++;
      setScores(newScores);
    } else {
      newLives[currentPlayer]--;
      setLives(newLives);
      if (newLives[currentPlayer] <= 0) {
        setWinner(currentPlayer === 0 ? 1 : 0);
        setDuelDone(true);
        return;
      }
    }
  }

  function nextDuelQuestion() {
    const next = duelIndex + 1;
    setDuelIndex(next);
    setDuelOptions(getOptions(duelList[next], FLAGS));
    setDuelAnswer(null);
    setCurrentPlayer(p => p === 0 ? 1 : 0);
  }

  const st = {
    app: { minHeight:"100vh", background:"linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)", color:"#fff", fontFamily:"'Segoe UI',sans-serif" },
    header: { padding:"20px 24px", borderBottom:"1px solid rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 },
    logo: { fontSize:28, fontWeight:700, cursor:"pointer", background:"linear-gradient(90deg,#e94560,#4a90d9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" },
    btn: (a) => ({ padding:"8px 18px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:600, fontSize:14, background: a ? "#e94560" : "rgba(255,255,255,0.1)", color:"#fff", transition:"all .2s" }),
    input: { padding:"8px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:14, outline:"none", width:200 },
    select: { padding:"8px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.2)", background:"rgba(30,40,70,0.9)", color:"#fff", fontSize:14, outline:"none" },
    grid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:16, padding:"0 24px 32px" },
    card: { background:"rgba(255,255,255,0.07)", borderRadius:12, padding:16, cursor:"pointer", border:"1px solid rgba(255,255,255,0.1)", transition:"transform .2s" },
    modal: { position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, padding:20 },
    box: { background:"#1a1a2e", borderRadius:16, padding:32, maxWidth:420, width:"100%", border:"1px solid rgba(255,255,255,0.15)" },
    tag: (c) => { const m={rood:"#e94560",blauw:"#4a90d9",groen:"#27ae60",geel:"#f1c40f",wit:"#ecf0f1",zwart:"#34495e",oranje:"#e67e22",lichtblauw:"#5dade2",meerkleurig:"#9b59b6"}; return {display:"inline-block",padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:m[c]||"#555",color:["wit","geel","lichtblauw"].includes(c)?"#222":"#fff",margin:"2px"}; },
  };

  const names = [p1Name||"Speler 1", p2Name||"Speler 2"];
  const playerColors = ["#e94560", "#4a90d9"];

  // ── DUEL SETUP ──
  if (mode === "duel-setup") {
    return (
      <div style={st.app}>
        <div style={st.header}>
          <span style={st.logo} onClick={() => setMode("home")}>🌍 Vlaggenwijzer</span>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"80vh",padding:24}}>
          <div style={{...st.box,maxWidth:480,textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:16}}>⚔️</div>
            <h2 style={{margin:"0 0 8px",fontSize:28}}>2-speler duel</h2>
            <p style={{color:"#aaa",marginBottom:32,fontSize:15}}>Speel om beurten. Wie als eerste 2 fouten maakt verliest!</p>
            <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:32}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:24}}>🔴</span>
                <input
                  style={{...st.input,width:"100%",border:"2px solid #e94560"}}
                  placeholder="Naam speler 1"
                  value={p1Name}
                  onChange={e => setP1Name(e.target.value)}
                  onKeyDown={e => e.key==="Enter" && startDuel()}
                />
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:24}}>🔵</span>
                <input
                  style={{...st.input,width:"100%",border:"2px solid #4a90d9"}}
                  placeholder="Naam speler 2"
                  value={p2Name}
                  onChange={e => setP2Name(e.target.value)}
                  onKeyDown={e => e.key==="Enter" && startDuel()}
                />
              </div>
            </div>
            <button style={{...st.btn(true),padding:"14px 40px",fontSize:18,borderRadius:12,width:"100%"}} onClick={startDuel}>
              🚀 Start duel!
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── DUEL WINNER ──
  if (mode === "duel" && duelDone && winner !== null) {
    const winnerName = names[winner];
    const loserName = names[winner === 0 ? 1 : 0];
    return (
      <div style={st.app}>
        <Confetti />
        <div style={st.header}>
          <span style={st.logo} onClick={() => setMode("home")}>🌍 Vlaggenwijzer</span>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"80vh",padding:24}}>
          <div style={{...st.box,textAlign:"center",maxWidth:520}}>
            <div style={{fontSize:80,marginBottom:8}}>🏆</div>
            <h2 style={{margin:"0 0 4px",fontSize:36,color:playerColors[winner]}}>{winnerName}</h2>
            <p style={{color:"#aaa",fontSize:18,marginBottom:8}}>wint het duel!</p>
            <p style={{color:"#666",fontSize:14,marginBottom:32}}>{loserName} had 2 fouten gemaakt.</p>

            <div style={{display:"flex",justifyContent:"center",gap:32,marginBottom:32}}>
              {[0,1].map(i => (
                <div key={i} style={{background:"rgba(255,255,255,0.05)",borderRadius:12,padding:"16px 24px",border:`2px solid ${i===winner?"#f1c40f":"rgba(255,255,255,0.1)"}`}}>
                  <div style={{fontSize:13,color:"#aaa",marginBottom:4}}>{names[i]}</div>
                  <div style={{fontSize:28,fontWeight:700,color:playerColors[i]}}>{scores[i]}</div>
                  <div style={{fontSize:12,color:"#666"}}>goed</div>
                  <div style={{marginTop:6}}><Lives count={lives[i]} /></div>
                </div>
              ))}
            </div>

            <div style={{display:"flex",gap:12,justifyContent:"center"}}>
              <button style={{...st.btn(true),padding:"12px 28px",fontSize:16}} onClick={() => { setMode("duel-setup"); }}>
                Opnieuw
              </button>
              <button style={{...st.btn(false),padding:"12px 28px",fontSize:16}} onClick={() => setMode("home")}>
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── DUEL PLAYING ──
  if (mode === "duel" && duelList.length > 0) {
    const current = duelList[duelIndex];
    const isCorrect = duelAnswer === current.id;
    const cp = currentPlayer;
    return (
      <div style={st.app}>
        <div style={st.header}>
          <span style={st.logo} onClick={() => setMode("home")}>🌍 Vlaggenwijzer</span>
          <button style={st.btn(false)} onClick={() => setMode("home")}>Stoppen</button>
        </div>

        {/* Scorebord */}
        <div style={{display:"flex",justifyContent:"center",gap:16,padding:"16px 24px 0"}}>
          {[0,1].map(i => (
            <div key={i} style={{
              flex:1, maxWidth:220,
              background: i===cp ? `linear-gradient(135deg,${playerColors[i]}22,${playerColors[i]}44)` : "rgba(255,255,255,0.04)",
              border: `2px solid ${i===cp ? playerColors[i] : "rgba(255,255,255,0.1)"}`,
              borderRadius:12, padding:"12px 16px",
              transition:"all .3s"
            }}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontWeight:700,fontSize:15,color: i===cp ? playerColors[i] : "#aaa"}}>
                  {i===cp ? "▶ " : ""}{names[i]}
                </span>
                <Lives count={lives[i]} />
              </div>
              <div style={{fontSize:24,fontWeight:700,color:playerColors[i],marginTop:4}}>{scores[i]} <span style={{fontSize:12,color:"#666",fontWeight:400}}>goed</span></div>
            </div>
          ))}
        </div>

        <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"24px 24px 40px",gap:24}}>
          {/* Beurt indicator */}
          <div style={{background:`${playerColors[cp]}22`,border:`1px solid ${playerColors[cp]}`,borderRadius:20,padding:"6px 20px",fontSize:14,fontWeight:600,color:playerColors[cp]}}>
            {names[cp]} is aan de beurt
          </div>

          {/* Vlag */}
          <div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:24,width:"100%",maxWidth:500,textAlign:"center"}}>
            <p style={{color:"#aaa",margin:"0 0 14px",fontSize:15}}>Van welk land is deze vlag?</p>
            <img src={current.vlag} alt="vlag" style={{width:"100%",maxWidth:300,aspectRatio:"3/2",objectFit:"contain",borderRadius:8,background:"rgba(255,255,255,0.05)"}} />
          </div>

          {/* Antwoord knoppen */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,width:"100%",maxWidth:500}}>
            {duelOptions.map(opt => {
              let bg = "rgba(255,255,255,0.08)";
              if (duelAnswer !== null) {
                if (opt.id === current.id) bg = "#27ae60";
                else if (opt.id === duelAnswer) bg = "#e94560";
              }
              return (
                <button key={opt.id} onClick={() => handleDuelAnswer(opt)}
                  style={{padding:"14px 16px",borderRadius:10,border:"1px solid rgba(255,255,255,0.15)",background:bg,color:"#fff",fontSize:15,fontWeight:600,cursor:duelAnswer?"default":"pointer",transition:"background .3s"}}>
                  {opt.naam}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {duelAnswer !== null && !duelDone && (
            <div style={{textAlign:"center"}}>
              {isCorrect ? (
                <p style={{color:"#27ae60",fontWeight:700,fontSize:16,margin:"0 0 12px"}}>
                  ✓ Goed gedaan, {names[cp]}!
                </p>
              ) : (
                <p style={{color:"#e94560",fontWeight:700,fontSize:16,margin:"0 0 12px"}}>
                  ✗ Fout! Het was <strong>{current.naam}</strong>. {lives[cp] > 0 ? `Nog ${lives[cp]} ${lives[cp]===1?"leven":"levens"} over.` : ""}
                </p>
              )}
              <button style={{...st.btn(true),padding:"12px 32px",fontSize:16}} onClick={nextDuelQuestion}>
                Volgende → ({names[currentPlayer === 0 ? 1 : 0]} is aan de beurt)
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── SOLO QUIZ DONE ──
  if (mode === "quiz" && quizDone) {
    const pct = Math.round((score / quizList.length) * 100);
    return (
      <div style={st.app}>
        <div style={st.header}><span style={st.logo} onClick={() => setMode("home")}>🌍 Vlaggenwijzer</span></div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"80vh",padding:24}}>
          <div style={{...st.box,textAlign:"center",maxWidth:480}}>
            <div style={{fontSize:64,marginBottom:16}}>{pct>=80?"🏆":pct>=50?"🎯":"📚"}</div>
            <h2 style={{margin:"0 0 8px",fontSize:28}}>Quiz klaar!</h2>
            <p style={{color:"#aaa",marginBottom:24}}>Je hebt {score} van de {quizList.length} vragen goed.</p>
            <div style={{fontSize:48,fontWeight:700,color:"#e94560",marginBottom:24}}>{pct}%</div>
            <div style={{display:"flex",gap:12,justifyContent:"center"}}>
              <button style={{...st.btn(true),padding:"12px 28px",fontSize:16}} onClick={startQuiz}>Opnieuw</button>
              <button style={{...st.btn(false),padding:"12px 28px",fontSize:16}} onClick={() => setMode("home")}>Home</button>
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
    return (
      <div style={st.app}>
        <div style={st.header}>
          <span style={st.logo} onClick={() => setMode("home")}>🌍 Vlaggenwijzer</span>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <span style={{color:"#aaa",fontSize:14}}>Vraag {quizIndex+1}/{quizList.length}</span>
            <span style={{color:"#e94560",fontWeight:700}}>Score: {score}</span>
            <button style={st.btn(false)} onClick={() => setMode("home")}>Stoppen</button>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"40px 24px",gap:28}}>
          <div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:28,width:"100%",maxWidth:500,textAlign:"center"}}>
            <p style={{color:"#aaa",margin:"0 0 14px",fontSize:15}}>Van welk land is deze vlag?</p>
            <img src={current.vlag} alt="vlag" style={{width:"100%",maxWidth:300,aspectRatio:"3/2",objectFit:"contain",borderRadius:8,background:"rgba(255,255,255,0.05)"}} />
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,width:"100%",maxWidth:500}}>
            {quizOptions.map(opt => {
              let bg = "rgba(255,255,255,0.08)";
              if (quizAnswer !== null) {
                if (opt.id === current.id) bg = "#27ae60";
                else if (opt.id === quizAnswer) bg = "#e94560";
              }
              return (
                <button key={opt.id} onClick={() => handleAnswer(opt)}
                  style={{padding:"14px 16px",borderRadius:10,border:"1px solid rgba(255,255,255,0.15)",background:bg,color:"#fff",fontSize:15,fontWeight:600,cursor:quizAnswer?"default":"pointer",transition:"background .3s"}}>
                  {opt.naam}
                </button>
              );
            })}
          </div>
          {quizAnswer !== null && (
            <div style={{textAlign:"center"}}>
              {isCorrect ? (
                <p style={{color:"#27ae60",fontWeight:700,fontSize:16,margin:"0 0 12px"}}>
                  ✓ Goed! Volgende vraag over {countdown ?? 0} {countdown === 1 ? "seconde" : "seconden"}...
                </p>
              ) : (
                <p style={{color:"#e94560",fontWeight:700,fontSize:16,margin:"0 0 12px"}}>
                  ✗ Fout! Het was <strong>{current.naam}</strong>
                </p>
              )}
              <button style={{...st.btn(true),padding:"12px 32px",fontSize:16}} onClick={nextQuestion}>
                {quizIndex + 1 < quizList.length ? "Volgende →" : "Resultaat bekijken"}
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
      <div style={st.header}>
        <span style={st.logo} onClick={() => setMode("home")}>🌍 Vlaggenwijzer</span>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button style={st.btn(mode==="browse")} onClick={() => setMode("browse")}>Bladeren</button>
          <button style={st.btn(false)} onClick={startQuiz}>Solo quiz</button>
          <button style={{...st.btn(false),background:"linear-gradient(90deg,#e9456044,#4a90d944)",border:"1px solid rgba(255,255,255,0.2)"}} onClick={() => setMode("duel-setup")}>⚔️ 2 spelers</button>
        </div>
      </div>

      {mode === "home" && (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"80vh",padding:24,textAlign:"center"}}>
          <div style={{fontSize:80,marginBottom:24}}>🌍</div>
          <h1 style={{fontSize:48,margin:"0 0 16px",fontWeight:800}}>Vlaggenwijzer</h1>
          <p style={{color:"#aaa",fontSize:18,maxWidth:500,marginBottom:48}}>Ontdek de vlaggen van alle 190 landen. Blader door het archief of test je kennis!</p>
          <div style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center"}}>
            <button style={{...st.btn(false),padding:"16px 32px",fontSize:17,borderRadius:12,background:"rgba(255,255,255,0.1)"}} onClick={() => setMode("browse")}>🗺 Bladeren</button>
            <button style={{...st.btn(true),padding:"16px 32px",fontSize:17,borderRadius:12}} onClick={startQuiz}>🎯 Solo quiz</button>
            <button style={{padding:"16px 32px",fontSize:17,borderRadius:12,border:"none",cursor:"pointer",fontWeight:700,background:"linear-gradient(135deg,#e94560,#4a90d9)",color:"#fff"}} onClick={() => setMode("duel-setup")}>⚔️ 2-speler duel</button>
          </div>
          <div style={{marginTop:48,display:"flex",gap:24,color:"#666",flexWrap:"wrap",justifyContent:"center"}}>
            {CONTINENTEN.filter(c => c !== "Alle").map(c => (
              <span key={c} style={{fontSize:13}}>{FLAGS.filter(f=>f.continent===c).length} {c}</span>
            ))}
          </div>
        </div>
      )}

      {mode === "browse" && (
        <>
          <div style={{padding:"16px 24px",display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
            <input style={st.input} placeholder="🔍 Zoeken..." value={search} onChange={e => setSearch(e.target.value)} />
            <select style={st.select} value={continent} onChange={e => setContinent(e.target.value)}>
              {CONTINENTEN.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <span style={{color:"#aaa",fontSize:14}}>{filtered.length} landen</span>
          </div>
          <div style={st.grid}>
            {filtered.map(f => (
              <div key={f.id} style={st.card} onClick={() => setSelected(f)}>
                <img src={f.vlag} alt={f.naam} style={{width:"100%",aspectRatio:"3/2",objectFit:"cover",borderRadius:6,marginBottom:10,background:"rgba(255,255,255,0.05)"}} loading="lazy" />
                <div style={{fontSize:13,fontWeight:600,textAlign:"center",color:"#e0e0e0"}}>{f.naam}</div>
                <div style={{textAlign:"center",fontSize:11,color:"#888",marginTop:4}}>{f.continent}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {selected && (
        <div style={st.modal} onClick={() => setSelected(null)}>
          <div style={st.box} onClick={e => e.stopPropagation()}>
            <img src={selected.vlag} alt={selected.naam} style={{width:"100%",borderRadius:10,marginBottom:20,aspectRatio:"3/2",objectFit:"contain",background:"rgba(255,255,255,0.05)"}} />
            <h2 style={{margin:"0 0 8px",fontSize:24}}>{selected.naam}</h2>
            <p style={{color:"#aaa",margin:"0 0 8px",fontSize:15}}>🏛 Hoofdstad: <strong style={{color:"#fff"}}>{selected.hoofdstad}</strong></p>
            <p style={{color:"#aaa",margin:"0 0 12px",fontSize:15}}>🌍 Continent: <strong style={{color:"#fff"}}>{selected.continent}</strong></p>
            <p style={{color:"#aaa",margin:"0 0 8px",fontSize:13}}>Kleuren:</p>
            <div>{selected.kleuren.map(k => <span key={k} style={st.tag(k)}>{k}</span>)}</div>
            {selected.symbool && <p style={{color:"#888",fontSize:12,marginTop:12}}>✦ Heeft symbool of wapen op de vlag</p>}
            <button style={{...st.btn(false),marginTop:20,width:"100%"}} onClick={() => setSelected(null)}>Sluiten</button>
          </div>
        </div>
      )}
    </div>
  );
}
