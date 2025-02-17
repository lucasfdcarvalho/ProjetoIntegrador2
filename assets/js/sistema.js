const input_nome = document.querySelector("#nome");
const input_marca = document.querySelector("#marca");
const input_quantidade = document.querySelector("#quantidade");
const select = document.querySelector("#unidade");
const search = document.querySelector("#search");
const btnAdicionar = document.querySelector("#btnAdicionar");
const table = document.querySelector("#tabela");

btnAdicionar.onclick = adicionarProduto;

function adicionarZerosDay(day){
    return day < 10? "0" + day: day;
}

function adicionarZerosMonth(month){
    return month < 10? "0" + month: month;
}

function salvarLocal(nome, marca, quantidade, textoSelecionado, day, month, year){
    if(!localStorage.getItem("Nome")){
        localStorage.setItem("Nome", nome);
        localStorage.setItem("Marca", marca);
        localStorage.setItem("Quantidade", quantidade);
        localStorage.setItem("Unidade", textoSelecionado);
        localStorage.setItem("Day", day);
        localStorage.setItem("Month", month);
        localStorage.setItem("Year", year);
        return true;
    }else{
        const nomes = localStorage.getItem("Nome");
        if(nomes.split(";").includes(nome)){
            alert("Produto Já Inserido! Insira outro produto");
            input_nome.focus();
            return false;
        }
        const marcas = localStorage.getItem("Marca");
        const quantidades = localStorage.getItem("Quantidade");
        const unidades = localStorage.getItem("Unidade");
        const days = localStorage.getItem("Day");
        const months = localStorage.getItem("Month");
        const years = localStorage.getItem("Year");
        localStorage.setItem("Nome", nomes + ";" + nome);
        localStorage.setItem("Marca", marcas + ";" + marca);
        localStorage.setItem("Quantidade", quantidades + ";" + quantidade);
        localStorage.setItem("Unidade", unidades + ";" + textoSelecionado);
        localStorage.setItem("Day", days + ";" + day);
        localStorage.setItem("Month", months + ";" + month);
        localStorage.setItem("Year", years + ";" + year);
        return true;
    }
}

function adicionarTabela(nome, marca, quantidade, textoSelecionado, day, month, year){  
    
    if(!salvarLocal(nome, marca, quantidade, textoSelecionado, day, month, year)){
        return;
    }

    const linha = table.insertRow(-1);

    const col1 = linha.insertCell(0);
    const col2 = linha.insertCell(1);
    const col3 = linha.insertCell(2);
    const col4 = linha.insertCell(3);
    const col5 = linha.insertCell(4);
    const col6 = linha.insertCell(5);

    const img = document.createElement("img");
    img.src = "assets/img/icon-remove.svg";
    img.alt = "Excluir";
    img.classList.add("remove");
    img.style.cursor = "pointer";
    img.width = 20;
    img.height = 20;

    const img2 = document.createElement("img");
    img2.src = "assets/img/icon-edit.svg";
    img2.alt = "Editar";
    img2.classList.add("edit");
    img2.style.cursor = "pointer";
    img2.style.marginLeft = ".5rem";
    img2.width = 20;
    img2.height = 20;

    
    col1.innerText = nome;
    col2.innerText = marca;
    col3.innerText = quantidade;
    col4.innerText = textoSelecionado;
    col5.innerText = `${adicionarZerosDay(day)}/${adicionarZerosMonth(month)}/${year}`;
    col6.appendChild(img);
    col6.appendChild(img2);
    col6.classList.add("center");
}

function adicionarProduto(){
    const nome = input_nome.value;
    const marca = input_marca.value;
    const quantidade = Number(input_quantidade.value);
    if(!nome || !marca || !quantidade){
        alert("Preencha os Campos Corretamente");
        return;
    }
    const index = select.selectedIndex;
    const textoSelecionado = select.options[index].text;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    adicionarTabela(nome, marca, quantidade, textoSelecionado, day, month, year);

    input_nome.value = "";
    input_marca.value = "";
    input_quantidade.value = "";
    select.selectedIndex = 0;
};

table.addEventListener("click", (e) =>{
    if(e.target.classList.contains("remove")){
        const nomeProduto = e.target.closest("tr").cells[0].innerText;

        let nomes = localStorage.getItem("Nome").split(";");
        let marcas = localStorage.getItem("Marca").split(";");
        let quantidades = localStorage.getItem("Quantidade").split(";");
        let unidades = localStorage.getItem("Unidade").split(";");
        let days = localStorage.getItem("Day").split(";");
        let months = localStorage.getItem("Month").split(";");
        let years = localStorage.getItem("Year").split(";");

        const index = nomes.indexOf(nomeProduto);
        if(index != -1){
            nomes.splice(index, 1);
            marcas.splice(index, 1);
            quantidades.splice(index ,1);
            unidades.splice(index, 1);
            days.splice(index, 1);
            months.splice(index, 1);
            years.splice(index, 1);

            localStorage.setItem("Nome", nomes.join(";"));
            localStorage.setItem("Marca", marcas.join(";"));
            localStorage.setItem("Quantidade", quantidades.join(";"));
            localStorage.setItem("Unidade", unidades.join(";"));
            localStorage.setItem("Day", days.join(";"));
            localStorage.setItem("Month", months.join(";"));
            localStorage.setItem("Year", years.join(";"));
        }

        e.target.closest("tr").remove();
    }else if(e.target.classList.contains("edit")){
        const nomeProduto = e.target.closest("tr").cells[0].innerText;
        const marcaProduto = e.target.closest("tr").cells[1].innerText;
        const quantidadeProduto = e.target.closest("tr").cells[2].innerText;
        const unidadeProduto = e.target.closest("tr").cells[3].innerText;

        input_nome.value = nomeProduto;
        input_marca.value = marcaProduto;
        input_quantidade.value = quantidadeProduto;
        for(let option of select.options){
            if(option.innerText == unidadeProduto){
                option.selected = true;
                break;
            }
        }

        let nomes = localStorage.getItem("Nome").split(";");
        let marcas = localStorage.getItem("Marca").split(";");
        let quantidades = localStorage.getItem("Quantidade").split(";");
        let unidades = localStorage.getItem("Unidade").split(";");
        let days = localStorage.getItem("Day").split(";");
        let months = localStorage.getItem("Month").split(";");
        let years = localStorage.getItem("Year").split(";");

        const index = nomes.indexOf(nomeProduto);
        if(index != -1){
            btnAdicionar.textContent = "Salvar Edição";

            btnAdicionar.onclick = () =>{
                const novoNome = input_nome.value;
                const novaMarca = input_marca.value;
                const novaQuantidade = Number(input_quantidade.value);
                const novoIndex = select.selectedIndex;
                const novaUnidade = select.options[novoIndex].text;
                const novoDate = new Date();
                const novoDay = novoDate.getDate();
                const novoMonth = novoDate.getMonth() + 1;
                const novoYear = novoDate.getFullYear();

                if (!novoNome || !novaMarca || !novaQuantidade || !novaUnidade) {
                    alert("Preencha os campos corretamente!");
                    return;
                }

                nomes[index] = novoNome;
                marcas[index] = novaMarca;
                quantidades[index] = novaQuantidade;
                unidades[index] = novaUnidade;
                days[index] = novoDay;
                months[index] = novoMonth;
                years[index] = novoYear;


                localStorage.setItem("Nome", nomes.join(";"));
                localStorage.setItem("Marca", marcas.join(";"));
                localStorage.setItem("Quantidade", quantidades.join(";"));
                localStorage.setItem("Unidade", unidades.join(";"));
                localStorage.setItem("Day", days.join(";"));
                localStorage.setItem("Month", months.join(";"));
                localStorage.setItem("Year", years.join(";"));

                input_nome.value = "";
                input_marca.value = "";
                input_quantidade.value = "";
                select.selectedIndex = 0;
                btnAdicionar.textContent = "Adicionar";
                btnAdicionar.onclick = adicionarProduto;

                window.location.reload();
            }
        }
    }
})


window.addEventListener("load", () =>{
    if(localStorage.getItem("Nome")){
        const nomes = localStorage.getItem("Nome").split(";");
        const marcas = localStorage.getItem("Marca").split(";");
        const quantidades = localStorage.getItem("Quantidade").split(";");
        const unidades = localStorage.getItem("Unidade").split(";");
        const days = localStorage.getItem("Day").split(";");
        const months = localStorage.getItem("Month").split(";");
        const years = localStorage.getItem("Year").split(";");
        for(let i = 0; i < nomes.length; i++){
            const linha = table.insertRow(-1);

            const col1 = linha.insertCell(0);
            const col2 = linha.insertCell(1);
            const col3 = linha.insertCell(2);
            const col4 = linha.insertCell(3);
            const col5 = linha.insertCell(4);
            const col6 = linha.insertCell(5);

            const img = document.createElement("img");
            img.src = "assets/img/icon-remove.svg";
            img.alt = "Excluir";
            img.classList.add("remove");
            img.classList.add("center")
            img.style.cursor = "pointer";
            img.width = 20;
            img.height = 20;

            const img2 = document.createElement("img");
            img2.src = "assets/img/icon-edit.svg";
            img2.alt = "Editar";
            img2.classList.add("edit");
            img2.style.cursor = "pointer";
            img2.style.marginLeft = ".5rem";
            img2.width = 20;
            img2.height = 20;

            col1.innerText = nomes[i];
            col2.innerText = marcas[i];
            col3.innerText = quantidades[i];
            col4.innerText = unidades[i];
            col5.innerText = `${adicionarZerosDay(days[i])}/${adicionarZerosMonth(months[i])}/${years[i]}`;
            col6.appendChild(img);
            col6.appendChild(img2);
            col6.classList.add("center");
        }
    }
});


search.addEventListener("input", () =>{
    const nomePesquisado = search.value.toLowerCase();
    const linha = table.getElementsByTagName("tr");
    /*
    for(let i = 1; i < linha.length; i++){
        const nomeProduto = linha[i].cells[0].innerText.toLocaleLowerCase();
        let flag = true;

        for(let j = 0; j < nomePesquisado.length; j++){
            if(nomePesquisado.charAt(j) != nomeProduto.charAt(j)){
                flag = false;
                break;
            }
        }

        if(flag){
            linha[i].style.display = "";
        }else{
            linha[i].style.display = "none";
        }
    }
    */
    
    for(let i = 1; i < linha.length; i++){
        const nomeProduto = linha[i].cells[0].innerText.toLowerCase();
        if(nomeProduto.includes(nomePesquisado)){
            linha[i].style.display = "";
        }else{
            linha[i].style.display = "none";
        }
    }
})

console.log(table.getElementsByTagName("tr"));