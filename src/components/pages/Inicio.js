import { Link, useNavigate } from 'react-router-dom'
import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
export default class Inicio extends Component {

    state = {
        columns: [
            {
                dataField: "country",
                text: "País",
                sort: true
            },
            {
                dataField: "countryInfo.iso3",
                text: "ISO",
                sort: true
            },
            {
                dataField: "todayCases",
                text: "Casos COVID de hoy",
                sort: true
            },
            {
                dataField: "todayDeaths",
                text: "Muertes COVID de hoy",
                sort: true
            },
            {
                dataField: "todayRecovered",
                text: "Recuperador de hoy",
                sort: true
            }
        ],
        data: [],
    }

    tableRowEvents = {
        onClick: (e, row, rowIndex) => {
            console.log(`clicked on row with index: ${row}`);
            window.location = `/Paises?iso3=${row.countryInfo.iso3}`;
        }
    }

    async componentDidMount() {
        const res = await axios.get('https://disease.sh/v3/covid-19/countries');
        this.setState({
            data: res.data
        });
    }

    render() {
        return (
            <div>
                <p>Inicio</p>

                <BootstrapTable
                    bootstrap4
                    hover
                    keyField="country"
                    data={this.state.data}
                    columns={this.state.columns}
                    pagination={paginationFactory({ sizePerPage: 50 })}
                    rowEvents={this.tableRowEvents}
                />

                <hr></hr>



            </div>
        )
    }

}