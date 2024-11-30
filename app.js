class Despesas{
    constructor(ano = "ano", mes="mes", dia="dia", tipo="tipo", descricao="descricao", valor="valor") {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if(this[i] == undefined || this[i] == null || this[i] == '') {
                return false
            } 
        }
        
        return true
    }
}

class BD {
    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }

    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {

        let despesaArray = Array()

        let id = localStorage.getItem('id')

        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))


            if (despesa === null) {
                continue

            } 

            despesa.id = i
            
            despesaArray.push(despesa)
            
        }
        return despesaArray
    }

    pesquisar(despesa) {

        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()
        

        if (despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano === despesa.ano)
        }

        if (despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes === despesa.mes)
        }

        if (despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia === despesa.dia)
        }

        if (despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo === despesa.tipo)
        }

        if (despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao === despesa.descricao)
        }

        if (despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor === despesa.valor)
        }
        return despesasFiltradas
    }

    remover(id) {
        localStorage.removeItem(id)
    }
}

let bd = new BD()


function cadastrarDespesas() {

    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value


    let despesa = new Despesas(ano, mes, dia, tipo, descricao, valor)


    if(despesa.validarDados()) {
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = 'Resgistro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'


        $('#modalRegistraDespesa').modal('show')

        this.ano.value = ''
        this.mes.value = ''
        this.dia.value = ''
        this.tipo.value = ''
        this.descricao.value = ''
        this.valor.value = ''

    } else {

        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos preenchidos!'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'

        $('#modalRegistraDespesa').modal('show')
    }

    
    
}

function carregaListaDespesas(arrayDespesas = Array(), filtro = false) {

    if (arrayDespesas.length == 0 && filtro == false) {
        arrayDespesas =  bd.recuperarTodosRegistros()
    }


    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    arrayDespesas.forEach(function(d){
        
        
        let linha = listaDespesas.insertRow()

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        
        let aux = 0

        switch (d.tipo) {
            case '1':
                aux = 'Alimentação'
                break;
            case '2':
                aux = 'Educação'
                break
            case '3':
                aux = 'Lazer'
                break
            case '4': 
                aux = 'Saúde'
                break
            case '5':
                aux = 'Transporte'
                break
            default:
                break;
        }
        
        linha.insertCell(1).innerHTML = aux 
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times" style="color: #000000;"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function() {
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)

            window.location.reload()
        }
        linha.insertCell(4).append(btn)
    })

}

function pesquisarDespesa() {

    let ano = document.getElementById('ano').value 
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value


    let despesa = new Despesas(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    this.carregaListaDespesas(despesas, true)

    
    
    
}