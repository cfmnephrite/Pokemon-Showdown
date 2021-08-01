const fs = require("fs"),
execSync = require('child_process').execSync,
path = './../new_cfm_site',
d = new Date(),
dateStr = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`

if (fs.existsSync(path)) {
	execSync('git checkout master', {cwd: path});
	execSync('git pull', {cwd: path});
	console.log('Checked out...')

	execSync('node cfm_data_to_site_assets.js');
	console.log('Copied assets!')

	execSync('git add .', {cwd: path});
	try {
		execSync(`git commit -m "Site update ${dateStr}"`, {cwd: path});
		execSync(`git push`, {cwd: path});
		console.log('Site files updated and pushed!');
	} catch(error) {
		console.log('No site changes made');
	}
}