import React, { Component } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AVG_LIMIT = 15;
const SUMMARY_LIMIT = 60;
export default class CountryInformation extends Component {
    
     
    state = {
        country: '',
        avgCases: 0,
        avgDeaths: 0,
        avgRecovered: 0,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Datos históricos de los últimos dos meses',
                },
            },
        },
        dataPerDay: {
            labels: [],
            datasets: []
        }
    };
    
    getLabels() {
        let labels = [];
        for (let i = 1; i < 61; i++) {
            labels.push(`día: ${i}`);
        }
        return labels;
    }


    getAvg(avgInfo) {
        let avg = 0;
        for (const key in avgInfo) {
            avg += avgInfo[key];
        }
        return avg / AVG_LIMIT;
    }

    getHistoricalCases(historicalCasesObj) {
        let historicalCases = [];
        for (const key in historicalCasesObj) {
            historicalCases.push(historicalCasesObj[key]);
        }
        return historicalCases;
    }

    getHistoricalDeaths(historicalDeathsObj) {
        let historicalCases = [];
        for (const key in historicalDeathsObj) {
            historicalCases.push(historicalDeathsObj[key]);
        }
        return historicalCases;
    }

    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const iso3 = params.get('iso3');
        const res = await axios.get(`https://corona.lmao.ninja/v2/historical/${iso3}?lastdays=${AVG_LIMIT}`);
        let cases = res.data.timeline.cases;
        let deaths = res.data.timeline.deaths;
        let recovered = res.data.timeline.recovered;

        const historicalDataRes = await axios.get(`https://corona.lmao.ninja/v2/historical/${iso3}?lastdays=${SUMMARY_LIMIT}`);

        this.setState({
            country: res.data.country,
            avgCases: this.getAvg(cases),
            avgDeaths: this.getAvg(deaths),
            avgRecovered: this.getAvg(recovered),
            dataPerDay: {
                labels: this.getLabels(),
                datasets: [
                    {
                        label: 'Muertes',
                        data: this.getHistoricalDeaths(historicalDataRes.data.timeline.deaths),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: 'Contagios',
                        data: this.getHistoricalCases(historicalDataRes.data.timeline.cases),
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            }
        });


    };


    render() {
        return (
            <div>
                <h1>País: {this.state.country}</h1>
                <div class="container">
                    <div class="row">

                        <div class="col-6">Contagios últimos 15 días: {this.state.avgCases}</div>
                        <div class="col-6">Muertes últimos 15 días: {this.state.avgDeaths}</div>
                        <div class="col-6">Recuperados últimos 15 días: {this.state.avgRecovered}</div>

                        <Line options={this.state.options} data={this.state.dataPerDay} />;
                    </div>
                </div>
            </div>
        )

    }

}
