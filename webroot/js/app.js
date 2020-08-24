function show_data(data) {
	// need to display:
	// name, alpha2Code, alpha3Code, flag, region, subregion, population, languages
	if (data == null) {
		alert('No results found');
	} else {
		var regions = {};
		var subregions = {};
		// display main table of country data
		$('#data_table').css('visibility', 'visible')
		for (var i = 0; i < data.length; i++) {
			var divname = 'data'.concat(i.toString());
			$('<tr>', {id: divname}).appendTo('#data_table');
			$('<td>'.concat(data[i].name).concat('</td>')).appendTo('#'.concat(divname));
			$('<td>'.concat(data[i].alpha2Code).concat('</td>')).appendTo('#'.concat(divname));
			$('<td>'.concat(data[i].alpha3Code).concat('</td>')).appendTo('#'.concat(divname));
			var flag = '<td><img src="'.concat(data[i].flag).concat('" alt="').concat(data[i].name).concat('" width="50" height="35"></td>')
			$(flag).appendTo('#'.concat(divname));
			if (data[i].region in regions) {
				regions[data[i].region]++;
			} else {
				regions[data[i].region] = 1;
			};
			$('<td>'.concat(data[i].region).concat('</td>')).appendTo('#'.concat(divname));
			if (data[i].subregion in subregions) {
				subregions[data[i].subregion]++;
			} else {
				subregions[data[i].subregion] = 1;
			};
			$('<td>'.concat(data[i].subregion).concat('</td>')).appendTo('#'.concat(divname));
			$('<td>'.concat(data[i].population.toLocaleString()).concat('</td>')).appendTo('#'.concat(divname));
			var lang = '<td><ul>'
			for (var j = 0; j < data[i].languages.length; j++) {
				lang = lang.concat('<li>').concat(data[i].languages[j].name).concat('</li>')
			};
			$(lang).appendTo('#'.concat(divname));
		};
		// tabulate and format auxiliary stats
		var results = '<p>Countries found: '.concat(data.length).concat('</p><p>Regions found:');
		var region_html = '<table style="width:50%" class="datatable"><thead><tr><th>Region</th><th>Instances</th></tr></thead>';
		for (var key in regions) {
			region_html = region_html.concat('<tr><td>').concat(key).concat('</td><td>').concat(regions[key]).concat('</td></tr>')
		};
		region_html = region_html.concat('</table></p><p>Subregions found:');
		var results = results.concat(region_html);
		var subregion_html = '<table style="width:50%" class="datatable"><thead><tr><th>Subregion</th><th>Instances</th></tr></thead>';
		for (var key in subregions) {
			subregion_html = subregion_html.concat('<tr><td>').concat(key).concat('</td><td>').concat(subregions[key]).concat('</td></tr>')
		};
		subregion_html = subregion_html.concat('</table></p>');
		var results = results.concat(subregion_html);
		$(results).appendTo('#results');
	};
};

var baseurl = "http://localhost:8765/api/index.php?"

// search by name
function search_name(event) {
	event.preventDefault();
	if ($("#name").val() == '') {
		alert('No country name submitted');
	} else {
		var url = baseurl + "name=" + $("#name").val();
		if ($('#full').prop('checked')) {url = url + "&full=True";};
	   	$.get(url, function (data) {show_data(data);});
   	};
};

// search by code
function search_code(event) {
	event.preventDefault();
	if ($("#code").val() == '') {
		alert('No country code submitted');
	} else {
		var url = baseurl + "code=" + $("#code").val();
		$.get(url, function (data) {show_data(data);});
	};
};