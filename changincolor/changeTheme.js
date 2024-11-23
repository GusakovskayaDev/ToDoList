
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
const toggleThemeBtn = document.getElementById('changeThemeBtn');
//
if (localStorage.getItem('checkboxChecked') === 'true') {
	toggleThemeBtn.checked = true;
}


toggleThemeBtn.addEventListener('click', () => {
	const currentTheme = document.documentElement.getAttribute('data-theme');
	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
	localStorage.setItem('theme', newTheme);
	//
	localStorage.setItem('checkboxChecked', toggleThemeBtn.checked);
});

