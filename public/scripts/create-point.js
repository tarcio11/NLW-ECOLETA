// adicionar uma api de estados e cidades
function populateUFs() {
   const ufSelect = document.querySelector('select[name=uf]')

   fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
   .then( res => res.json() )
   .then( states => {

      for ( state  of states ) {
         ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
         
      }

   })
}

populateUFs()

function getCities(event) {
   const citySelect = document.querySelector("[name=city]")
   const stateInput = document.querySelector("[name=state]")

   const ufValue = event.target.value

   const indexOfSelectedState = event.target.selectedIndex
   stateInput.value = event.target.options[indexOfSelectedState].text

   const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

   citySelect.innerHTML = `<option value>Selecione a Cidade</option>`
   citySelect.disabled = true


   fetch(url)
      .then( res => res.json() )
      .then( cities => {
         for ( city of cities ) {
            citySelect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`
         }
         citySelect.disabled = false
      })
}

document
            .querySelector('select[name=uf]')
            .addEventListener('change', getCities)

// Selecionar os li do fieldset itens de coleta
// Pegar todos os li
const itensToCollect = document.querySelectorAll('.itens-grid li')

for ( item of itensToCollect ) {
   item.addEventListener('click', handleSelectedItem)
}

const collecteditens = document.querySelector('[name=itens]')

let seletcteditens = []

function handleSelectedItem(event) {
   const itemLi = event.target
   
   itemLi.classList.toggle('selected')

   const itemId = itemLi.dataset.id

   // Verificar se existem itens selecionados, se sim
   // Pegar esses itens selecionados
   const alreadySelected = seletcteditens.findIndex( item => item == itemId ) // isso será true ou false
   // Se ja estiver selecionado, tirar da seleção
   if( alreadySelected != -1 ) {
      const filtereditens = seletcteditens.filter( item => item != itemId) // false
      seletcteditens = filtereditens
   }else {
      // Se não estiver selecionado, adicionar a seleção
       seletcteditens.push(itemId)
    }

    console.log(seletcteditens);
   // Atualizar o campo escondido com os itens selecionados
   // document.querySelector('input[name=itens]')
   collecteditens.value = seletcteditens
}