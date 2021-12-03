import React, { Component } from 'react';
import queryString from 'querystring'
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export default class Paises extends Component {

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
            labels.push('día: ' + i);
        }
        return labels;
    }

    getAvgDeaths(deaths) {
        let avgDeaths = 0;
        for (const key in deaths) {
            avgDeaths += deaths[key];
        }
        return avgDeaths / 15;
    }

    getAvgCases(cases) {
        let avgCases = 0;
        for (const key in cases) {
            avgCases += cases[key];
        }
        return avgCases / 15;
    }

    getAvgRecovered(recovered) {
        let avgRecovered = 0;
        for (const key in recovered) {
            avgRecovered += recovered[key];
        }
        return avgRecovered / 15;
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
        const res = await axios.get(`https://corona.lmao.ninja/v2/historical/${iso3}?lastdays=15`);
        let cases = res.data.timeline.cases;
        let deaths = res.data.timeline.deaths;
        let recovered = res.data.timeline.recovered;

        const historicalDataRes = await axios.get(`https://corona.lmao.ninja/v2/historical/${iso3}?lastdays=60`);

        this.setState({
            country: res.data.country,
            avgCases: this.getAvgCases(cases),
            avgDeaths: this.getAvgDeaths(deaths),
            avgRecovered: this.getAvgRecovered(recovered),
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
                <p>País: {this.state.country}</p>
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
