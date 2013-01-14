/* url parameters request*/
var urlParameters = [], hash;
var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
for(var i = 0; i < hashes.length; i++){
    hash = hashes[i].split('=');
    urlParameters.push(hash[0]);
    urlParameters[hash[0]] = hash[1];
}
    
/* default options */
var appMLconf = {
	spinning_loading_options : {
			  lines: 11, // The number of lines to draw
			  length: 3, // The length of each line
			  width: 3, // The line thickness
			  radius: 7, // The radius of the inner circle
			  rotate: 0, // The rotation offset
			  color: '#fff', // #rgb or #rrggbb
			  speed: 1, // Rounds per second
			  trail: 38, // Afterglow percentage
			  shadow: false, // Whether to render a shadow
			  hwaccel: false, // Whether to use hardware acceleration
			  className: 'spinner', // The CSS class to assign to the spinner
			  zIndex: 2e9, // The z-index (defaults to 2000000000)
			  top: 'auto', // Top position relative to parent in px
			  left: 'auto' // Left position relative to parent in px
	},
	localization: false,
	data_json_path:"js/hicTech/data.js",//'js/hicTech/data.js',
	loading_timeout : 25000, // milliseconds after force overlay hidding
	initial_loading_fake_delay:2200,
	dataValidation: true, // check for id duplications, link consistency etc...
	refreshOnOrientationChange: true,
	sidebar:"32%",
	sidebarScrollable:false,
	add2HomeTooltip: false,
	forcedStartingPage: false
}

