try {
    new Function("return import('data:text/javascript;base64,Cg==').then(r => true)")();
} catch (e) {
    location.href = '/outdated.html'
}
