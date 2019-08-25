import React, { Component } from 'react';
import "./Conversor.css";

export default class Conversor extends Component {

    constructor(props){
        super(props);

        this.state = {
            moedaA_valor: "",
            moedaB_valor: 0
        };

        //Definido funções
        this.insereMoedaA = this.insereMoedaA.bind(this);
        this.converter = this.converter.bind(this);

    }
    
    converter(){
        let de_para = `${this.props.moedaA}_${this.props.moedaB}`;
        let url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=y&apiKey=474e0aaad5e43d4de67a`;

        fetch(url).then(res => {
            return res.json();
        }).then(json=> {
            let cotacao = json[de_para].val;
            let moedaB_valor = (parseFloat(this.state.moedaA_valor * cotacao)).toFixed(2);

            this.setState({
                moedaB_valor
            });
        });
    }

    insereMoedaA(e){
        this.setState({
            moedaA_valor: e.target.value
        });
    }

    render() {
        return (
            <div className="conversor">
                <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
                <input type="text" onChange={this.insereMoedaA}></input>
                <input type="button" onClick={this.converter} value="Converter"></input>
                <h2>{this.state.moedaB_valor}</h2>
            </div>
        );
    }
}
