export const fetchDoubanMovies = async () => {
    const response = await fetch("https://api.douban.com/v2/movie/in_theaters");
    const data = await response.json();
    return data.subjects;
}

export const login = async (username, password) => {
    const response = await fetch('https://rlw12sclussq02.lab.rmsonecloud.net/v1/token/create', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })
    if (response.ok) {
        const { token } = await response.json();
        return token;
    }
    console.log(response);
    const errMessage = await response.text();
    throw new Error(errMessage);
}
