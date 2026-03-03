import { useState, useMemo } from "react";

const FLAGS = [
  {id:1,naam:"Nederland",continent:"Europa",hoofdstad:"Amsterdam",vlag:"https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg",symbool:false,kleuren:["rood","wit","blauw"]},
  {id:2,naam:"Duitsland",continent:"Europa",hoofdstad:"Berlijn",vlag:"https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",symbool:false,kleuren:["zwart","rood","geel"]},
  {id:3,naam:"Italië",continent:"Europa",hoofdstad:"Rome",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg",symbool:false,kleuren:["groen","wit","rood"]},
  {id:4,naam:"België",continent:"Europa",hoofdstad:"Brussel",vlag:"https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg",symbool:false,kleuren:["zwart","geel","rood"]},
  {id:5,naam:"Frankrijk",continent:"Europa",hoofdstad:"Parijs",vlag:"https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",symbool:false,kleuren:["blauw","wit","rood"]},
  {id:6,naam:"Spanje",continent:"Europa",hoofdstad:"Madrid",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",symbool:true,kleuren:["rood","geel"]},
  {id:7,naam:"Portugal",continent:"Europa",hoofdstad:"Lissabon",vlag:"https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg",symbool:true,kleuren:["groen","rood"]},
  {id:8,naam:"Albanië",continent:"Europa",hoofdstad:"Tirana",vlag:"https://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg",symbool:true,kleuren:["rood","zwart"]},
  {id:9,naam:"Andorra",continent:"Europa",hoofdstad:"Andorra la Vella",vlag:"https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Andorra.svg",symbool:true,kleuren:["blauw","geel","rood"]},
  {id:10,naam:"Armenië",continent:"Europa",hoofdstad:"Jerevan",vlag:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Armenia.svg",symbool:false,kleuren:["rood","blauw","geel"]},
  {id:11,naam:"Azerbeidzjan",continent:"Europa",hoofdstad:"Bakoe",vlag:"https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Azerbaijan.svg",symbool:true,kleuren:["blauw","rood","groen"]},
  {id:12,naam:"Bosnië en Herzegovina",continent:"Europa",hoofdstad:"Sarajevo",vlag:"https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bosnia_and_Herzegovina.svg",symbool:false,kleuren:["blauw","geel","wit"]},
  {id:13,naam:"Bulgarije",continent:"Europa",hoofdstad:"Sofia",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Bulgaria.svg",symbool:false,kleuren:["wit","groen","rood"]},
  {id:14,naam:"Cyprus",continent:"Europa",hoofdstad:"Nicosia",vlag:"https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Cyprus.svg",symbool:true,kleuren:["wit","oranje","groen"]},
  {id:15,naam:"Denemarken",continent:"Europa",hoofdstad:"Kopenhagen",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg",symbool:false,kleuren:["rood","wit"]},
  {id:16,naam:"Estland",continent:"Europa",hoofdstad:"Tallinn",vlag:"https://upload.wikimedia.org/wikipedia/commons/8/8f/Flag_of_Estonia.svg",symbool:false,kleuren:["blauw","zwart","wit"]},
  {id:17,naam:"Finland",continent:"Europa",hoofdstad:"Helsinki",vlag:"https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg",symbool:false,kleuren:["wit","blauw"]},
  {id:18,naam:"Georgië",continent:"Europa",hoofdstad:"Tbilisi",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Georgia.svg",symbool:false,kleuren:["wit","rood"]},
  {id:19,naam:"Griekenland",continent:"Europa",hoofdstad:"Athene",vlag:"https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg",symbool:false,kleuren:["blauw","wit"]},
  {id:20,naam:"Hongarije",continent:"Europa",hoofdstad:"Boedapest",vlag:"https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg",symbool:false,kleuren:["rood","wit","groen"]},
  {id:21,naam:"Ierland",continent:"Europa",hoofdstad:"Dublin",vlag:"https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg",symbool:false,kleuren:["groen","wit","oranje"]},
  {id:22,naam:"IJsland",continent:"Europa",hoofdstad:"Reykjavik",vlag:"https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Iceland.svg",symbool:false,kleuren:["blauw","rood","wit"]},
  {id:23,naam:"Kazachstan",continent:"Europa",hoofdstad:"Astana",vlag:"https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kazakhstan.svg",symbool:true,kleuren:["lichtblauw","geel"]},
  {id:24,naam:"Kosovo",continent:"Europa",hoofdstad:"Pristina",vlag:"https://upload.wikimedia.org/wikipedia/commons/1/1f/Flag_of_Kosovo.svg",symbool:true,kleuren:["blauw","wit"]},
  {id:25,naam:"Kroatië",continent:"Europa",hoofdstad:"Zagreb",vlag:"https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg",symbool:true,kleuren:["rood","wit","blauw"]},
  {id:26,naam:"Letland",continent:"Europa",hoofdstad:"Riga",vlag:"https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Latvia.svg",symbool:false,kleuren:["rood","wit"]},
  {id:27,naam:"Liechtenstein",continent:"Europa",hoofdstad:"Vaduz",vlag:"https://upload.wikimedia.org/wikipedia/commons/4/47/Flag_of_Liechtenstein.svg",symbool:true,kleuren:["geel","blauw","rood"]},
  {id:28,naam:"Litouwen",continent:"Europa",hoofdstad:"Vilnius",vlag:"https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Lithuania.svg",symbool:false,kleuren:["geel","groen","rood"]},
  {id:29,naam:"Luxemburg",continent:"Europa",hoofdstad:"Luxemburg",vlag:"https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Luxembourg.svg",symbool:false,kleuren:["rood","wit","lichtblauw"]},
  {id:30,naam:"Malta",continent:"Europa",hoofdstad:"Valletta",vlag:"https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Malta.svg",symbool:true,kleuren:["wit","rood"]},
  {id:31,naam:"Moldavië",continent:"Europa",hoofdstad:"Chisinau",vlag:"https://upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Moldova.svg",symbool:true,kleuren:["blauw","geel","rood"]},
  {id:32,naam:"Monaco",continent:"Europa",hoofdstad:"Monaco-Ville",vlag:"https://upload.wikimedia.org/wikipedia/commons/e/ea/Flag_of_Monaco.svg",symbool:false,kleuren:["rood","wit"]},
  {id:33,naam:"Montenegro",continent:"Europa",hoofdstad:"Podgorica",vlag:"https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",symbool:true,kleuren:["rood","geel"]},
  {id:34,naam:"Noord-Macedonië",continent:"Europa",hoofdstad:"Skopje",vlag:"https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_North_Macedonia.svg",symbool:false,kleuren:["rood","geel"]},
  {id:35,naam:"Noorwegen",continent:"Europa",hoofdstad:"Oslo",vlag:"https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg",symbool:false,kleuren:["rood","blauw","wit"]},
  {id:36,naam:"Oekraïne",continent:"Europa",hoofdstad:"Kiev",vlag:"https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg",symbool:false,kleuren:["blauw","geel"]},
  {id:37,naam:"Oostenrijk",continent:"Europa",hoofdstad:"Wenen",vlag:"https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg",symbool:false,kleuren:["rood","wit"]},
  {id:38,naam:"Polen",continent:"Europa",hoofdstad:"Warschau",vlag:"https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg",symbool:false,kleuren:["wit","rood"]},
  {id:39,naam:"Roemenië",continent:"Europa",hoofdstad:"Boekarest",vlag:"https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg",symbool:false,kleuren:["blauw","geel","rood"]},
  {id:40,naam:"Rusland",continent:"Europa",hoofdstad:"Moskou",vlag:"https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg",symbool:false,kleuren:["wit","blauw","rood"]},
  {id:41,naam:"San Marino",continent:"Europa",hoofdstad:"San Marino",vlag:"https://upload.wikimedia.org/wikipedia/commons/b/b1/Flag_of_San_Marino.svg",symbool:true,kleuren:["wit","blauw"]},
  {id:42,naam:"Servië",continent:"Europa",hoofdstad:"Belgrado",vlag:"https://upload.wikimedia.org/wikipedia/commons/f/ff/Flag_of_Serbia.svg",symbool:true,kleuren:["rood","blauw","wit"]},
  {id:43,naam:"Slovenië",continent:"Europa",hoofdstad:"Ljubljana",vlag:"https://upload.wikimedia.org/wikipedia/commons/f/f0/Flag_of_Slovenia.svg",symbool:true,kleuren:["wit","blauw","rood"]},
  {id:44,naam:"Slowakije",continent:"Europa",hoofdstad:"Bratislava",vlag:"https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Slovakia.svg",symbool:true,kleuren:["wit","blauw","rood"]},
  {id:45,naam:"Tsjechië",continent:"Europa",hoofdstad:"Praag",vlag:"https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg",symbool:false,kleuren:["blauw","rood","wit"]},
  {id:46,naam:"Turkije",continent:"Europa",hoofdstad:"Ankara",vlag:"https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg",symbool:true,kleuren:["rood","wit"]},
  {id:47,naam:"Vaticaanstad",continent:"Europa",hoofdstad:"Vaticaanstad",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_the_Vatican_City.svg",symbool:true,kleuren:["geel","wit"]},
  {id:48,naam:"Verenigd Koninkrijk",continent:"Europa",hoofdstad:"Londen",vlag:"https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg",symbool:false,kleuren:["blauw","rood","wit"]},
  {id:49,naam:"Wit-Rusland",continent:"Europa",hoofdstad:"Minsk",vlag:"https://upload.wikimedia.org/wikipedia/commons/8/85/Flag_of_Belarus.svg",symbool:true,kleuren:["rood","groen","wit"]},
  {id:50,naam:"Zweden",continent:"Europa",hoofdstad:"Stockholm",vlag:"https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg",symbool:false,kleuren:["blauw","geel"]},
  {id:51,naam:"Zwitserland",continent:"Europa",hoofdstad:"Bern",vlag:"https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg",symbool:false,kleuren:["rood","wit"]},
  {id:52,naam:"Antigua en Barbuda",continent:"Noord Amerika",hoofdstad:"Saint John's",vlag:"https://upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Antigua_and_Barbuda.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:53,naam:"Bahama's",continent:"Noord Amerika",hoofdstad:"Nassau",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/93/Flag_of_the_Bahamas.svg",symbool:false,kleuren:["blauw","geel","zwart"]},
  {id:54,naam:"Barbados",continent:"Noord Amerika",hoofdstad:"Bridgetown",vlag:"https://upload.wikimedia.org/wikipedia/commons/e/ef/Flag_of_Barbados.svg",symbool:true,kleuren:["blauw","geel"]},
  {id:55,naam:"Belize",continent:"Noord Amerika",hoofdstad:"Belmopan",vlag:"https://upload.wikimedia.org/wikipedia/commons/e/e7/Flag_of_Belize.svg",symbool:true,kleuren:["rood","blauw","wit"]},
  {id:56,naam:"Canada",continent:"Noord Amerika",hoofdstad:"Ottawa",vlag:"https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg",symbool:true,kleuren:["rood","wit"]},
  {id:57,naam:"Costa Rica",continent:"Noord Amerika",hoofdstad:"San José",vlag:"https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Costa_Rica_%28state%29.svg",symbool:false,kleuren:["blauw","wit","rood"]},
  {id:58,naam:"Cuba",continent:"Noord Amerika",hoofdstad:"Havana",vlag:"https://upload.wikimedia.org/wikipedia/commons/b/bd/Flag_of_Cuba.svg",symbool:true,kleuren:["rood","blauw","wit"]},
  {id:59,naam:"Dominica",continent:"Noord Amerika",hoofdstad:"Roseau",vlag:"https://upload.wikimedia.org/wikipedia/commons/c/c4/Flag_of_Dominica.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:60,naam:"Dominicaanse Republiek",continent:"Noord Amerika",hoofdstad:"Santo Domingo",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_the_Dominican_Republic.svg",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:61,naam:"El Salvador",continent:"Noord Amerika",hoofdstad:"San Salvador",vlag:"https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_El_Salvador.svg",symbool:true,kleuren:["blauw","wit"]},
  {id:62,naam:"Grenada",continent:"Noord Amerika",hoofdstad:"Saint George's",vlag:"https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Grenada.svg",symbool:true,kleuren:["rood","geel","groen"]},
  {id:63,naam:"Guatemala",continent:"Noord Amerika",hoofdstad:"Guatemala-stad",vlag:"https://upload.wikimedia.org/wikipedia/commons/e/ec/Flag_of_Guatemala.svg",symbool:true,kleuren:["lichtblauw","wit"]},
  {id:64,naam:"Haïti",continent:"Noord Amerika",hoofdstad:"Port-au-Prince",vlag:"https://upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Haiti.svg",symbool:true,kleuren:["blauw","rood"]},
  {id:65,naam:"Honduras",continent:"Noord Amerika",hoofdstad:"Tegucigalpa",vlag:"https://upload.wikimedia.org/wikipedia/commons/8/82/Flag_of_Honduras.svg",symbool:false,kleuren:["lichtblauw","wit"]},
  {id:66,naam:"Jamaica",continent:"Noord Amerika",hoofdstad:"Kingston",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Jamaica.svg",symbool:false,kleuren:["groen","zwart","geel"]},
  {id:67,naam:"Mexico",continent:"Noord Amerika",hoofdstad:"Mexico-Stad",vlag:"https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg",symbool:true,kleuren:["groen","wit","rood"]},
  {id:68,naam:"Nicaragua",continent:"Noord Amerika",hoofdstad:"Managua",vlag:"https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Nicaragua.svg",symbool:true,kleuren:["blauw","wit"]},
  {id:69,naam:"Panama",continent:"Noord Amerika",hoofdstad:"Panama-Stad",vlag:"https://upload.wikimedia.org/wikipedia/commons/a/ab/Flag_of_Panama.svg",symbool:false,kleuren:["rood","blauw","wit"]},
  {id:70,naam:"Saint Kitts en Nevis",continent:"Noord Amerika",hoofdstad:"Basseterre",vlag:"https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Saint_Kitts_and_Nevis.svg",symbool:true,kleuren:["groen","zwart","rood"]},
  {id:71,naam:"Saint Lucia",continent:"Noord Amerika",hoofdstad:"Castries",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Saint_Lucia.svg",symbool:true,kleuren:["lichtblauw","zwart","geel"]},
  {id:72,naam:"Saint Vincent en de Grenadines",continent:"Noord Amerika",hoofdstad:"Kingstown",vlag:"https://upload.wikimedia.org/wikipedia/commons/6/6d/Flag_of_Saint_Vincent_and_the_Grenadines.svg",symbool:true,kleuren:["blauw","geel","groen"]},
  {id:73,naam:"Trinidad en Tobago",continent:"Noord Amerika",hoofdstad:"Port of Spain",vlag:"https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Trinidad_and_Tobago.svg",symbool:false,kleuren:["rood","zwart","wit"]},
  {id:74,naam:"Verenigde Staten",continent:"Noord Amerika",hoofdstad:"Washington D.C.",vlag:"https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",symbool:false,kleuren:["rood","wit","blauw"]},
  {id:75,naam:"Argentinië",continent:"Zuid Amerika",hoofdstad:"Buenos Aires",vlag:"https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",symbool:true,kleuren:["lichtblauw","wit","geel"]},
  {id:76,naam:"Bolivia",continent:"Zuid Amerika",hoofdstad:"Sucre",vlag:"https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_Bolivia_%28state%29.svg",symbool:false,kleuren:["rood","geel","groen"]},
  {id:77,naam:"Brazilië",continent:"Zuid Amerika",hoofdstad:"Brasilia",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg",symbool:true,kleuren:["groen","geel","blauw"]},
  {id:78,naam:"Chili",continent:"Zuid Amerika",hoofdstad:"Santiago",vlag:"https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg",symbool:true,kleuren:["blauw","wit","rood"]},
  {id:79,naam:"Colombia",continent:"Zuid Amerika",hoofdstad:"Bogotá",vlag:"https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg",symbool:false,kleuren:["geel","blauw","rood"]},
  {id:80,naam:"Ecuador",continent:"Zuid Amerika",hoofdstad:"Quito",vlag:"https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg",symbool:true,kleuren:["geel","blauw","rood"]},
  {id:81,naam:"Frans Guyana",continent:"Zuid Amerika",hoofdstad:"Cayenne",vlag:"https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",symbool:false,kleuren:["blauw","wit","rood"]},
  {id:82,naam:"Guyana",continent:"Zuid Amerika",hoofdstad:"Georgetown",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_Guyana.svg",symbool:false,kleuren:["rood","geel","groen"]},
  {id:83,naam:"Paraguay",continent:"Zuid Amerika",hoofdstad:"Asunción",vlag:"https://upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Paraguay.svg",symbool:true,kleuren:["rood","wit","blauw"]},
  {id:84,naam:"Peru",continent:"Zuid Amerika",hoofdstad:"Lima",vlag:"https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg",symbool:false,kleuren:["rood","wit"]},
  {id:85,naam:"Suriname",continent:"Zuid Amerika",hoofdstad:"Paramaribo",vlag:"https://upload.wikimedia.org/wikipedia/commons/6/60/Flag_of_Suriname.svg",symbool:true,kleuren:["groen","rood","wit"]},
  {id:86,naam:"Uruguay",continent:"Zuid Amerika",hoofdstad:"Montevideo",vlag:"https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Uruguay.svg",symbool:true,kleuren:["geel","wit","blauw"]},
  {id:87,naam:"Venezuela",continent:"Zuid Amerika",hoofdstad:"Caracas",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Venezuela.svg",symbool:true,kleuren:["geel","blauw","rood"]},
  {id:88,naam:"Australië",continent:"Oceanië",hoofdstad:"Canberra",vlag:"https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg",symbool:true,kleuren:["rood","blauw","wit"]},
  {id:89,naam:"Fiji",continent:"Oceanië",hoofdstad:"Suva",vlag:"https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Fiji.svg",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:90,naam:"Kiribati",continent:"Oceanië",hoofdstad:"Zuid-Tarawa",vlag:"https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kiribati.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:91,naam:"Marshalleilanden",continent:"Oceanië",hoofdstad:"Majuro",vlag:"https://upload.wikimedia.org/wikipedia/commons/2/2e/Flag_of_the_Marshall_Islands.svg",symbool:true,kleuren:["wit","blauw","oranje"]},
  {id:92,naam:"Micronesië",continent:"Oceanië",hoofdstad:"Palikir",vlag:"https://upload.wikimedia.org/wikipedia/commons/e/e4/Flag_of_the_Federated_States_of_Micronesia.svg",symbool:true,kleuren:["blauw","wit"]},
  {id:93,naam:"Nauru",continent:"Oceanië",hoofdstad:"Yaren",vlag:"https://upload.wikimedia.org/wikipedia/commons/3/30/Flag_of_Nauru.svg",symbool:true,kleuren:["blauw","geel","wit"]},
  {id:94,naam:"Nieuw-Zeeland",continent:"Oceanië",hoofdstad:"Wellington",vlag:"https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:95,naam:"Palau",continent:"Oceanië",hoofdstad:"Ngerulmud",vlag:"https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Palau.svg",symbool:false,kleuren:["blauw","geel"]},
  {id:96,naam:"Papoea-Nieuw-Guinea",continent:"Oceanië",hoofdstad:"Port Moresby",vlag:"https://upload.wikimedia.org/wikipedia/commons/e/e3/Flag_of_Papua_New_Guinea.svg",symbool:true,kleuren:["zwart","rood","geel"]},
  {id:97,naam:"Salomonseilanden",continent:"Oceanië",hoofdstad:"Honiara",vlag:"https://upload.wikimedia.org/wikipedia/commons/7/74/Flag_of_the_Solomon_Islands.svg",symbool:true,kleuren:["blauw","geel","groen"]},
  {id:98,naam:"Samoa",continent:"Oceanië",hoofdstad:"Apia",vlag:"https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Samoa.svg",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:99,naam:"Tonga",continent:"Oceanië",hoofdstad:"Nuku'alofa",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Tonga.svg",symbool:false,kleuren:["rood","wit"]},
  {id:100,naam:"Tuvalu",continent:"Oceanië",hoofdstad:"Funafuti",vlag:"https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tuvalu.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:101,naam:"Vanuatu",continent:"Oceanië",hoofdstad:"Port Vila",vlag:"https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Vanuatu.svg",symbool:true,kleuren:["rood","zwart","groen"]},
  {id:102,naam:"Afghanistan",continent:"Azië",hoofdstad:"Kabul",vlag:"https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",symbool:true,kleuren:["wit","zwart"]},
  {id:103,naam:"Bahrein",continent:"Azië",hoofdstad:"Manama",vlag:"https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Bahrain.svg",symbool:false,kleuren:["wit","rood"]},
  {id:104,naam:"Bangladesh",continent:"Azië",hoofdstad:"Dhaka",vlag:"https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg",symbool:false,kleuren:["groen","rood"]},
  {id:105,naam:"Bhutan",continent:"Azië",hoofdstad:"Thimphu",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/91/Flag_of_Bhutan.svg",symbool:true,kleuren:["geel","oranje","wit"]},
  {id:106,naam:"Brunei",continent:"Azië",hoofdstad:"Bandar Seri Begawan",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Brunei.svg",symbool:true,kleuren:["geel","wit","zwart"]},
  {id:107,naam:"Cambodja",continent:"Azië",hoofdstad:"Phnom Penh",vlag:"https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:108,naam:"China",continent:"Azië",hoofdstad:"Peking",vlag:"https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",symbool:true,kleuren:["geel","rood"]},
  {id:109,naam:"Egypte",continent:"Azië",hoofdstad:"Cairo",vlag:"https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg",symbool:true,kleuren:["rood","wit","zwart"]},
  {id:110,naam:"Filipijnen",continent:"Azië",hoofdstad:"Manilla",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg",symbool:true,kleuren:["rood","wit","blauw"]},
  {id:111,naam:"India",continent:"Azië",hoofdstad:"New Delhi",vlag:"https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg",symbool:true,kleuren:["oranje","wit","groen"]},
  {id:112,naam:"Indonesië",continent:"Azië",hoofdstad:"Jakarta",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg",symbool:false,kleuren:["rood","wit"]},
  {id:113,naam:"Irak",continent:"Azië",hoofdstad:"Bagdad",vlag:"https://upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Iraq.svg",symbool:true,kleuren:["rood","wit","zwart"]},
  {id:114,naam:"Iran",continent:"Azië",hoofdstad:"Teheran",vlag:"https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg",symbool:true,kleuren:["groen","wit","rood"]},
  {id:115,naam:"Israël",continent:"Azië",hoofdstad:"Jeruzalem",vlag:"https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg",symbool:true,kleuren:["blauw","wit"]},
  {id:116,naam:"Japan",continent:"Azië",hoofdstad:"Tokio",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg",symbool:false,kleuren:["wit","rood"]},
  {id:117,naam:"Jemen",continent:"Azië",hoofdstad:"Sanaa",vlag:"https://upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Yemen.svg",symbool:false,kleuren:["rood","wit","zwart"]},
  {id:118,naam:"Jordanië",continent:"Azië",hoofdstad:"Amman",vlag:"https://upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Jordan.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:119,naam:"Kirgizië",continent:"Azië",hoofdstad:"Bisjkek",vlag:"https://upload.wikimedia.org/wikipedia/commons/c/c7/Flag_of_Kyrgyzstan.svg",symbool:true,kleuren:["rood","geel"]},
  {id:120,naam:"Koeweit",continent:"Azië",hoofdstad:"Koeweit-Stad",vlag:"https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_Kuwait.svg",symbool:false,kleuren:["groen","wit","rood","zwart"]},
  {id:121,naam:"Laos",continent:"Azië",hoofdstad:"Vientiane",vlag:"https://upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Laos.svg",symbool:false,kleuren:["rood","blauw","wit"]},
  {id:122,naam:"Libanon",continent:"Azië",hoofdstad:"Beiroet",vlag:"https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Lebanon.svg",symbool:true,kleuren:["rood","wit","groen"]},
  {id:123,naam:"Malediven",continent:"Azië",hoofdstad:"Malé",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Maldives.svg",symbool:true,kleuren:["rood","groen","wit"]},
  {id:124,naam:"Maleisië",continent:"Azië",hoofdstad:"Kuala Lumpur",vlag:"https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:125,naam:"Mongolië",continent:"Azië",hoofdstad:"Ulaanbaatar",vlag:"https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Mongolia.svg",symbool:true,kleuren:["rood","blauw","geel"]},
  {id:126,naam:"Myanmar",continent:"Azië",hoofdstad:"Naypyidaw",vlag:"https://upload.wikimedia.org/wikipedia/commons/8/8c/Flag_of_Myanmar.svg",symbool:true,kleuren:["geel","groen","rood"]},
  {id:127,naam:"Nepal",continent:"Azië",hoofdstad:"Kathmandu",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:128,naam:"Noord-Korea",continent:"Azië",hoofdstad:"Pyongyang",vlag:"https://upload.wikimedia.org/wikipedia/commons/5/51/Flag_of_North_Korea.svg",symbool:true,kleuren:["blauw","rood","wit"]},
  {id:129,naam:"Oezbekistan",continent:"Azië",hoofdstad:"Tasjkent",vlag:"https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg",symbool:true,kleuren:["blauw","wit","groen"]},
  {id:130,naam:"Oman",continent:"Azië",hoofdstad:"Muscat",vlag:"https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Oman.svg",symbool:true,kleuren:["wit","rood","groen"]},
  {id:131,naam:"Oost-Timor",continent:"Azië",hoofdstad:"Dili",vlag:"https://upload.wikimedia.org/wikipedia/commons/2/26/Flag_of_East_Timor.svg",symbool:true,kleuren:["zwart","geel","rood"]},
  {id:132,naam:"Pakistan",continent:"Azië",hoofdstad:"Islamabad",vlag:"https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg",symbool:true,kleuren:["wit","groen"]},
  {id:133,naam:"Palestina",continent:"Azië",hoofdstad:"Ramallah",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Palestine.svg",symbool:false,kleuren:["meerkleurig"]},
  {id:134,naam:"Qatar",continent:"Azië",hoofdstad:"Doha",vlag:"https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg",symbool:false,kleuren:["rood","wit"]},
  {id:135,naam:"Saoedi-Arabië",continent:"Azië",hoofdstad:"Riyad",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg",symbool:true,kleuren:["groen","wit"]},
  {id:136,naam:"Singapore",continent:"Azië",hoofdstad:"Singapore",vlag:"https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg",symbool:true,kleuren:["rood","wit"]},
  {id:137,naam:"Sri Lanka",continent:"Azië",hoofdstad:"Sri Jayewardenepura Kotte",vlag:"https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:138,naam:"Syrië",continent:"Azië",hoofdstad:"Damascus",vlag:"https://upload.wikimedia.org/wikipedia/commons/5/53/Flag_of_Syria.svg",symbool:true,kleuren:["rood","wit","zwart"]},
  {id:139,naam:"Tadzjikistan",continent:"Azië",hoofdstad:"Dusjanbe",vlag:"https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Tajikistan.svg",symbool:true,kleuren:["rood","wit","groen"]},
  {id:140,naam:"Thailand",continent:"Azië",hoofdstad:"Bangkok",vlag:"https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg",symbool:false,kleuren:["wit","blauw","rood"]},
  {id:141,naam:"Turkmenistan",continent:"Azië",hoofdstad:"Asjchabad",vlag:"https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Turkmenistan.svg",symbool:true,kleuren:["groen","wit","rood"]},
  {id:142,naam:"VAE",continent:"Azië",hoofdstad:"Abu Dhabi",vlag:"https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg",symbool:false,kleuren:["meerkleurig"]},
  {id:143,naam:"Vietnam",continent:"Azië",hoofdstad:"Hanoi",vlag:"https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg",symbool:true,kleuren:["geel","rood"]},
  {id:144,naam:"Zuid-Korea",continent:"Azië",hoofdstad:"Seoel",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg",symbool:true,kleuren:["wit","blauw","rood"]},
  {id:145,naam:"Algerije",continent:"Afrika",hoofdstad:"Algiers",vlag:"https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg",symbool:true,kleuren:["groen","rood","wit"]},
  {id:146,naam:"Angola",continent:"Afrika",hoofdstad:"Luanda",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg",symbool:true,kleuren:["rood","geel","zwart"]},
  {id:147,naam:"Benin",continent:"Afrika",hoofdstad:"Porto-Novo",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Benin.svg",symbool:false,kleuren:["groen","rood","geel"]},
  {id:148,naam:"Botswana",continent:"Afrika",hoofdstad:"Gaborone",vlag:"https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_Botswana.svg",symbool:false,kleuren:["blauw","wit","zwart"]},
  {id:149,naam:"Burkina Faso",continent:"Afrika",hoofdstad:"Ouagadougou",vlag:"https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Burkina_Faso.svg",symbool:true,kleuren:["rood","geel","groen"]},
  {id:150,naam:"Burundi",continent:"Afrika",hoofdstad:"Gitega",vlag:"https://upload.wikimedia.org/wikipedia/commons/5/50/Flag_of_Burundi.svg",symbool:true,kleuren:["groen","rood","wit"]},
  {id:151,naam:"Centraal-Afrikaanse Republiek",continent:"Afrika",hoofdstad:"Bangui",vlag:"https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Central_African_Republic.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:152,naam:"Comoren",continent:"Afrika",hoofdstad:"Moroni",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/94/Flag_of_the_Comoros.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:153,naam:"Congo-Brazzaville",continent:"Afrika",hoofdstad:"Brazzaville",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_the_Republic_of_the_Congo.svg",symbool:false,kleuren:["groen","geel","rood"]},
  {id:154,naam:"Congo-Kinshasa",continent:"Afrika",hoofdstad:"Kinshasa",vlag:"https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg",symbool:true,kleuren:["blauw","geel","rood"]},
  {id:155,naam:"Djibouti",continent:"Afrika",hoofdstad:"Djibouti",vlag:"https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_Djibouti.svg",symbool:true,kleuren:["blauw","wit","groen"]},
  {id:156,naam:"Equatoriaal-Guinea",continent:"Afrika",hoofdstad:"Malabo",vlag:"https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Equatorial_Guinea.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:157,naam:"Eritrea",continent:"Afrika",hoofdstad:"Asmara",vlag:"https://upload.wikimedia.org/wikipedia/commons/2/2b/Flag_of_Eritrea.svg",symbool:true,kleuren:["rood","groen","blauw"]},
  {id:158,naam:"Ethiopië",continent:"Afrika",hoofdstad:"Addis Abeba",vlag:"https://upload.wikimedia.org/wikipedia/commons/7/71/Flag_of_Ethiopia.svg",symbool:true,kleuren:["groen","geel","rood"]},
  {id:159,naam:"Gabon",continent:"Afrika",hoofdstad:"Libreville",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/04/Flag_of_Gabon.svg",symbool:false,kleuren:["groen","geel","blauw"]},
  {id:160,naam:"Gambia",continent:"Afrika",hoofdstad:"Banjul",vlag:"https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_The_Gambia.svg",symbool:false,kleuren:["rood","blauw","groen"]},
  {id:161,naam:"Ghana",continent:"Afrika",hoofdstad:"Accra",vlag:"https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.svg",symbool:true,kleuren:["rood","geel","groen"]},
  {id:162,naam:"Guinee",continent:"Afrika",hoofdstad:"Conakry",vlag:"https://upload.wikimedia.org/wikipedia/commons/e/ed/Flag_of_Guinea.svg",symbool:false,kleuren:["rood","geel","groen"]},
  {id:163,naam:"Guinee-Bissau",continent:"Afrika",hoofdstad:"Bissau",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Guinea-Bissau.svg",symbool:true,kleuren:["rood","geel","groen"]},
  {id:164,naam:"Ivoorkust",continent:"Afrika",hoofdstad:"Yamoussoukro",vlag:"https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_C%C3%B4te_d%27Ivoire.svg",symbool:false,kleuren:["oranje","wit","groen"]},
  {id:165,naam:"Kaapverdië",continent:"Afrika",hoofdstad:"Praia",vlag:"https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Cape_Verde.svg",symbool:true,kleuren:["blauw","wit","rood"]},
  {id:166,naam:"Kenia",continent:"Afrika",hoofdstad:"Nairobi",vlag:"https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg",symbool:true,kleuren:["zwart","rood","groen"]},
  {id:167,naam:"Liberia",continent:"Afrika",hoofdstad:"Monrovia",vlag:"https://upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_Liberia.svg",symbool:true,kleuren:["rood","wit","blauw"]},
  {id:168,naam:"Libië",continent:"Afrika",hoofdstad:"Tripoli",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Libya.svg",symbool:true,kleuren:["rood","zwart","groen"]},
  {id:169,naam:"Madagaskar",continent:"Afrika",hoofdstad:"Antananarivo",vlag:"https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Madagascar.svg",symbool:false,kleuren:["wit","rood","groen"]},
  {id:170,naam:"Malawi",continent:"Afrika",hoofdstad:"Lilongwe",vlag:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Flag_of_Malawi.svg",symbool:true,kleuren:["zwart","rood","groen"]},
  {id:171,naam:"Mali",continent:"Afrika",hoofdstad:"Bamako",vlag:"https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Mali.svg",symbool:false,kleuren:["groen","geel","rood"]},
  {id:172,naam:"Marokko",continent:"Afrika",hoofdstad:"Rabat",vlag:"https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg",symbool:true,kleuren:["rood","groen"]},
  {id:173,naam:"Mozambique",continent:"Afrika",hoofdstad:"Maputo",vlag:"https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Mozambique.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:174,naam:"Niger",continent:"Afrika",hoofdstad:"Niamey",vlag:"https://upload.wikimedia.org/wikipedia/commons/f/f4/Flag_of_Niger.svg",symbool:true,kleuren:["oranje","wit","groen"]},
  {id:175,naam:"Nigeria",continent:"Afrika",hoofdstad:"Abuja",vlag:"https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg",symbool:false,kleuren:["groen","wit"]},
  {id:176,naam:"Oeganda",continent:"Afrika",hoofdstad:"Kampala",vlag:"https://upload.wikimedia.org/wikipedia/commons/4/4e/Flag_of_Uganda.svg",symbool:true,kleuren:["geel","rood","zwart"]},
  {id:177,naam:"Rwanda",continent:"Afrika",hoofdstad:"Kigali",vlag:"https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Rwanda.svg",symbool:true,kleuren:["blauw","geel","groen"]},
  {id:178,naam:"Sao Tomé en Príncipe",continent:"Afrika",hoofdstad:"São Tomé",vlag:"https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Sao_Tome_and_Principe.svg",symbool:true,kleuren:["rood","groen","geel"]},
  {id:179,naam:"Senegal",continent:"Afrika",hoofdstad:"Dakar",vlag:"https://upload.wikimedia.org/wikipedia/commons/f/fd/Flag_of_Senegal.svg",symbool:true,kleuren:["groen","geel","rood"]},
  {id:180,naam:"Sierra Leone",continent:"Afrika",hoofdstad:"Freetown",vlag:"https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Sierra_Leone.svg",symbool:false,kleuren:["groen","wit","blauw"]},
  {id:181,naam:"Soedan",continent:"Afrika",hoofdstad:"Khartoem",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Sudan.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:182,naam:"Somalië",continent:"Afrika",hoofdstad:"Mogadishu",vlag:"https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Somalia.svg",symbool:true,kleuren:["blauw","wit"]},
  {id:183,naam:"Tanzania",continent:"Afrika",hoofdstad:"Dodoma",vlag:"https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tanzania.svg",symbool:false,kleuren:["groen","zwart","blauw"]},
  {id:184,naam:"Togo",continent:"Afrika",hoofdstad:"Lomé",vlag:"https://upload.wikimedia.org/wikipedia/commons/6/68/Flag_of_Togo.svg",symbool:true,kleuren:["rood","groen","geel"]},
  {id:185,naam:"Tsjaad",continent:"Afrika",hoofdstad:"N'Djamena",vlag:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Flag_of_Chad.svg",symbool:false,kleuren:["blauw","geel","rood"]},
  {id:186,naam:"Tunesië",continent:"Afrika",hoofdstad:"Tunis",vlag:"https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Tunisia.svg",symbool:true,kleuren:["rood","wit"]},
  {id:187,naam:"Zambia",continent:"Afrika",hoofdstad:"Lusaka",vlag:"https://upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Zambia.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:188,naam:"Zimbabwe",continent:"Afrika",hoofdstad:"Harare",vlag:"https://upload.wikimedia.org/wikipedia/commons/6/6a/Flag_of_Zimbabwe.svg",symbool:true,kleuren:["meerkleurig"]},
  {id:189,naam:"Zuid-Afrika",continent:"Afrika",hoofdstad:"Kaapstad",vlag:"https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg",symbool:false,kleuren:["meerkleurig"]},
  {id:190,naam:"Zuid-Soedan",continent:"Afrika",hoofdstad:"Juba",vlag:"https://upload.wikimedia.org/wikipedia/commons/7/7a/Flag_of_South_Sudan.svg",symbool:true,kleuren:["meerkleurig"]},
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
  const wrong = shuffle(pool).slice(0, 3);
  return shuffle([correct, ...wrong]);
}

export default function App() {
  const [mode, setMode] = useState("home");
  const [continent, setContinent] = useState("Alle");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // Quiz state
  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const filtered = useMemo(() => {
    return FLAGS.filter(f => {
      const matchC = continent === "Alle" || f.continent === continent;
      const matchS = f.naam.toLowerCase().includes(search.toLowerCase());
      return matchC && matchS;
    });
  }, [continent, search]);

  function startQuiz() {
    const pool = continent === "Alle" ? FLAGS : FLAGS.filter(f => f.continent === continent);
    const list = shuffle(pool).slice(0, 20);
    setQuizList(list);
    setQuizIndex(0);
    setQuizOptions(getOptions(list[0], pool));
    setQuizAnswer(null);
    setScore(0);
    setQuizDone(false);
    setMode("quiz");
  }

  function handleAnswer(flag) {
    if (quizAnswer !== null) return;
    setQuizAnswer(flag.id);
    if (flag.id === quizList[quizIndex].id) setScore(s => s + 1);
  }

  function nextQuestion() {
    const pool = continent === "Alle" ? FLAGS : FLAGS.filter(f => f.continent === continent);
    const next = quizIndex + 1;
    if (next >= quizList.length) {
      setQuizDone(true);
    } else {
      setQuizIndex(next);
      setQuizOptions(getOptions(quizList[next], pool));
      setQuizAnswer(null);
    }
  }

  const styles = {
    app: { minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", color: "#fff", fontFamily: "'Segoe UI', sans-serif" },
    header: { padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 },
    logo: { fontSize: 28, fontWeight: 700, cursor: "pointer", background: "linear-gradient(90deg,#e94560,#0f3460)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    nav: { display: "flex", gap: 10 },
    btn: (active) => ({ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, background: active ? "#e94560" : "rgba(255,255,255,0.1)", color: "#fff", transition: "all .2s" }),
    controls: { padding: "16px 24px", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" },
    input: { padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 14, outline: "none", width: 200 },
    select: { padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(30,40,70,0.9)", color: "#fff", fontSize: 14, outline: "none" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16, padding: "0 24px 32px" },
    card: (hover) => ({ background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: 16, cursor: "pointer", transition: "all .2s", border: "1px solid rgba(255,255,255,0.1)", transform: hover ? "translateY(-4px)" : "none", boxShadow: hover ? "0 8px 24px rgba(0,0,0,0.3)" : "none" }),
    flag: { width: "100%", aspectRatio: "3/2", objectFit: "cover", borderRadius: 6, marginBottom: 10, background: "rgba(255,255,255,0.05)" },
    countryName: { fontSize: 13, fontWeight: 600, textAlign: "center", color: "#e0e0e0" },
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 },
    modalBox: { background: "#1a1a2e", borderRadius: 16, padding: 32, maxWidth: 420, width: "100%", border: "1px solid rgba(255,255,255,0.15)" },
    tag: (c) => { const colors = { rood:"#e94560",blauw:"#4a90d9",groen:"#27ae60",geel:"#f1c40f",wit:"#ecf0f1",zwart:"#34495e",oranje:"#e67e22",lichtblauw:"#5dade2",meerkleurig:"#9b59b6" }; return { display:"inline-block", padding:"2px 10px", borderRadius:20, fontSize:11, fontWeight:600, background:colors[c]||"#555", color: c==="wit"||c==="geel"||c==="lichtblauw" ? "#222" : "#fff", margin:"2px" }; },
  };

  if (mode === "quiz") {
    if (quizDone) {
      const pct = Math.round((score / quizList.length) * 100);
      return (
        <div style={styles.app}>
          <div style={{...styles.header}}>
            <span style={styles.logo} onClick={() => setMode("home")}>🌍 Vlaggenwijzer</span>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"80vh",padding:24}}>
            <div style={{...styles.modalBox, textAlign:"center", maxWidth:480}}>
              <div style={{fontSize:64,marginBottom:16}}>{pct>=80?"🏆":pct>=50?"🎯":"📚"}</div>
              <h2 style={{margin:"0 0 8px",fontSize:28}}>Quiz klaar!</h2>
              <p style={{color:"#aaa",marginBottom:24}}>Je hebt {score} van de {quizList.length} vragen goed.</p>
              <div style={{fontSize:48,fontWeight:700,color:"#e94560",marginBottom:24}}>{pct}%</div>
              <div style={{display:"flex",gap:12,justifyContent:"center"}}>
                <button style={{...styles.btn(true),padding:"12px 28px",fontSize:16}} onClick={startQuiz}>Opnieuw</button>
                <button style={{...styles.btn(false),padding:"12px 28px",fontSize:16}} onClick={() => setMode("browse")}>Bladeren</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const current = quizList[quizIndex];
    return (
      <div style={styles.app}>
        <div style={styles.header}>
          <span style={styles.logo} onClick={() => setMode("home")}>🌍 Vlaggenwijzer</span>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <span style={{color:"#aaa",fontSize:14}}>Vraag {quizIndex+1}/{quizList.length}</span>
            <span style={{color:"#e94560",fontWeight:700}}>Score: {score}</span>
            <button style={styles.btn(false)} onClick={() => setMode("home")}>Stoppen</button>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"40px 24px",gap:32}}>
          <div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:32,width:"100%",maxWidth:500,textAlign:"center"}}>
            <p style={{color:"#aaa",margin:"0 0 16px",fontSize:15}}>Van welk land is deze vlag?</p>
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
                <button key={opt.id} onClick={() => handleAnswer(opt)} style={{padding:"14px 16px",borderRadius:10,border:"1px solid rgba(255,255,255,0.15)",background:bg,color:"#fff",fontSize:15,fontWeight:600,cursor:"pointer",transition:"all .2s"}}>
                  {opt.naam}
                </button>
              );
            })}
          </div>
          {quizAnswer !== null && (
            <button style={{...styles.btn(true),padding:"12px 32px",fontSize:16}} onClick={nextQuestion}>
              {quizIndex + 1 < quizList.length ? "Volgende →" : "Resultaat bekijken"}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <span style={styles.logo} onClick={() => setMode("home")}>🌍 Vlaggenwijzer</span>
        <div style={styles.nav}>
          <button style={styles.btn(mode==="browse")} onClick={() => setMode("browse")}>Bladeren</button>
          <button style={styles.btn(false)} onClick={startQuiz}>Quiz spelen</button>
        </div>
      </div>

      {mode === "home" && (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"80vh",padding:24,textAlign:"center"}}>
          <div style={{fontSize:80,marginBottom:24}}>🌍</div>
          <h1 style={{fontSize:48,margin:"0 0 16px",fontWeight:800}}>Vlaggenwijzer</h1>
          <p style={{color:"#aaa",fontSize:18,maxWidth:500,marginBottom:48}}>Ontdek de vlaggen van alle 190 landen ter wereld. Blader door het archief of test je kennis met een quiz!</p>
          <div style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center"}}>
            <button style={{...styles.btn(true),padding:"16px 36px",fontSize:18,borderRadius:12}} onClick={() => setMode("browse")}>🗺 Bladeren</button>
            <button style={{...styles.btn(false),padding:"16px 36px",fontSize:18,borderRadius:12,background:"rgba(255,255,255,0.12)"}} onClick={startQuiz}>🎯 Quiz spelen</button>
          </div>
          <div style={{marginTop:48,display:"flex",gap:32,color:"#666"}}>
            {CONTINENTEN.filter(c => c !== "Alle").map(c => (
              <span key={c} style={{fontSize:13}}>{FLAGS.filter(f=>f.continent===c).length} {c}</span>
            ))}
          </div>
        </div>
      )}

      {mode === "browse" && (
        <>
          <div style={styles.controls}>
            <input style={styles.input} placeholder="🔍 Zoeken..." value={search} onChange={e => setSearch(e.target.value)} />
            <select style={styles.select} value={continent} onChange={e => setContinent(e.target.value)}>
              {CONTINENTEN.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <span style={{color:"#aaa",fontSize:14}}>{filtered.length} landen</span>
          </div>
          <div style={styles.grid}>
            {filtered.map(f => (
              <div key={f.id} style={styles.card(false)} onClick={() => setSelected(f)}>
                <img src={f.vlag} alt={f.naam} style={styles.flag} loading="lazy" />
                <div style={styles.countryName}>{f.naam}</div>
                <div style={{textAlign:"center",fontSize:11,color:"#888",marginTop:4}}>{f.continent}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {selected && (
        <div style={styles.modal} onClick={() => setSelected(null)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            <img src={selected.vlag} alt={selected.naam} style={{width:"100%",borderRadius:10,marginBottom:20,aspectRatio:"3/2",objectFit:"contain",background:"rgba(255,255,255,0.05)"}} />
            <h2 style={{margin:"0 0 8px",fontSize:24}}>{selected.naam}</h2>
            <p style={{color:"#aaa",margin:"0 0 16px",fontSize:15}}>🏛 Hoofdstad: <strong style={{color:"#fff"}}>{selected.hoofdstad}</strong></p>
            <p style={{color:"#aaa",margin:"0 0 12px",fontSize:15}}>🌍 Continent: <strong style={{color:"#fff"}}>{selected.continent}</strong></p>
            <p style={{color:"#aaa",margin:"0 0 8px",fontSize:13}}>Kleuren:</p>
            <div>{selected.kleuren.map(k => <span key={k} style={styles.tag(k)}>{k}</span>)}</div>
            {selected.symbool && <p style={{color:"#888",fontSize:12,marginTop:12}}>✦ Heeft symbool of wapen op de vlag</p>}
            <button style={{...styles.btn(false),marginTop:20,width:"100%"}} onClick={() => setSelected(null)}>Sluiten</button>
          </div>
        </div>
      )}
    </div>
  );
}
