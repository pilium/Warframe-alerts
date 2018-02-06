    let sortieDate = document.querySelector('.sorties-date');
    let date = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    };
    sortieDate.innerHTML = date.toLocaleString("ru", options);