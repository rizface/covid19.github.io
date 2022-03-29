const countriesApi = "https://covid19.mathdro.id/api/countries/";

const getCountries = async () => {
    const res = await fetch(countriesApi);
    const data = await res.json();

    return data?.countries;
}

const getCountryDetail = async (country) => {
    const res = await fetch(`${countriesApi}${country}`);
    const data =  await res?.json();
    return data;        
}

const getCountryFlag = (country) => {
    const img = document.createElement("img")
    img.src = `https://flagcdn.com/16x12/${country.toLowerCase()}.png` 
    img.classList.add("mr-2")
    return img
}

const convertToTimestamp = (epoch) => {
    const d = new Date(0);
    d.setUTCSeconds(epoch);

    return d;
}

const generateTd = (data) => {
    const td = document.createElement("td");
    td.textContent = data
    return td;
}

const generateData = (props) => {
    const {country, confirmed, deaths, lastUpdate} = props
    const date = new Date(lastUpdate);

    const countryTd = generateTd(country.name);
    countryTd.prepend(getCountryFlag(country.iso2))
    const confirmedTd = generateTd(confirmed.value);
    const deathsTd = generateTd(deaths.value);
    const lastUpdateTd = generateTd(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
    const tr = document.createElement("tr");
    tr.append(countryTd, confirmedTd, deathsTd, lastUpdateTd);

    return tr;
}

(async () => {
    alert(`
        Website Ini Dibuat Oleh 
        Nama   : Muhammad Al Farizzi
        Kelas   : Teknik Informatika 2A Pagi
        NIM     : 3312101017
    `)
    const countries = await getCountries();
    const tbody = document.getElementById("content")
    countries.forEach(async (country) => {
        const { iso2 } = country;
        if(iso2) {
            try {
                const detail = await getCountryDetail(country.iso2);
                if(detail.confirmed) {
                    const { confirmed, deaths, lastUpdate } = detail
                    const tr = generateData(
                        {
                            country, confirmed, deaths, lastUpdate
                        }
                    )
                    tbody.append(tr);
                }
            } catch (error) {}
        }
    });
})()