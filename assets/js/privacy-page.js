/* Standalone policy page: no app permissions, tracking or account required. */
(function(){
  const policy=window.EgoMetraPrivacy,select=document.getElementById('privacy-language');
  Object.entries(policy.names).forEach(([code,name])=>{const option=document.createElement('option');option.value=code;option.textContent=name;select.append(option)});
  function display(code){
    const language=policy.resolveLanguage(code),copy=policy.content[language];
    document.documentElement.lang=language;document.title='EgoMetra · '+copy.title;
    document.getElementById('privacy-language-label').textContent=copy.language;select.value=language;
    policy.render(language,document.getElementById('privacy-document'));
  }
  const requested=new URLSearchParams(location.search).get('lang');
  display(policy.resolveLanguage(requested,navigator.languages?.[0]||navigator.language));
  select.addEventListener('change',()=>{display(select.value);const url=new URL(location.href);url.searchParams.set('lang',select.value);history.replaceState(null,'',url)});
})();
