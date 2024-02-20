
async function handleSubmit() {
    console.log('button pressed');
    const url = 'https://qwq4uzmkaq6tmmj7afeozfguke0ulend.lambda-url.us-east-1.on.aws/?query=hi';
    let par = document.getElementsByClassName('query');

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const textData = await response.json();
        console.log(textData);
        par.textContent = textData;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}
