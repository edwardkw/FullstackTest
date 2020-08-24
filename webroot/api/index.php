<?php
 header('Content-Type: application/json');
 // buid api url and fetch data
 $url = "https://restcountries.eu/rest/v2/";
 if (isset($_GET['code'])) {
 	$url .= "alpha/";
 	$url .= $_GET['code'];
 } else {
 	$url .= "name/";
 	$url .= $_GET['name'];
 };
 if (isset($_GET['full'])) {
 	$url .= "?fullText=true";
 };

 // convert data to array and sort by pop desc
 $country_xml = file_get_contents($url);
 $country_json = json_encode($country_xml);
 $country_array = json_decode($country_xml, True);
 function sort_countries($country1, $country2) {
 	return $country2['population'] - $country1['population'];
 };
 usort($country_array, 'sort_countries');

 // return json
 echo json_encode($country_array);
?>