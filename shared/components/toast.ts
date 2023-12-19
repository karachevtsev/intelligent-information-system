function success(message: string) {
    show('success', message);
}

function error(message: string) {
    show('error', message);
}

function info(message: string) {
    show('info', message);
}

function show(type: string, message: string): void {
    if (!document.body.contains(document.querySelector('.toast-block')!)) {
        const toastBlock = document.createElement('div');
        toastBlock.classList.add('toast-block');
        document.body.append(toastBlock);

        toastBlock.addEventListener('click', (event) => {
            const target = event.target as HTMLDivElement;
            if (target.className != 'toast-close') return;
            const toast = target.closest('.toast');
            toast!.remove();
        });
    }

    const toast = document.createElement('div');
    const close = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    toast.innerHTML = message;
    document.querySelector('.toast-block')!.append(toast);
    close.classList.add('toast-close');
    toast!.append(close);

    setTimeout(() => toast.classList.add('toast-visible'), 200);
    setTimeout(() => toast.classList.remove('toast-visible'), 1800);
    setTimeout(() => {
        toast.remove();
        if (!document.body.contains(document.querySelector('.toast'))) {
            const toastBlock = document.querySelector('.toast-block');
            if (toastBlock) toastBlock!.remove();
        }
    }, 2000);
}

const toast = { success, error, info };

export default toast;
