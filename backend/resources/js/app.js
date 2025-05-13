window.Echo.private('chat')
    .listen('.SendMessageEvent', (e) => {
        console.log('Новое сообщение:', e.message, 'от:', e.from);
    });
