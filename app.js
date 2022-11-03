var submitButton = document.querySelector("#app form button")
var zipCodeField = document.querySelector("#app form button")
var content = document.querySelector("#app main")

submitButton.addEventListener("click", run)

function run(event) {
  event.preventDefault()

  var zipCode = zipCodeField.value

  zipCode = zipCode.replace(" ", "")
  zipCode = zipCode.replace(".", "")
  zipCode = zipCode.trim()

  axios
    .get("https://viacep.com.br/ws/" + zipCode + "/json/")
    .then(function (response) {
      if (response.data.erro) {
        throw new Error("CEP inválido")
      }

      createline(response.data.logradouro)
      createline(response.data.localidade)
      createline(response.data.uf)
    })
    .catch(function (error) {
      console.log(error)
      createline("Ops, Algo deu errado!")
    })
}

function createline(text) {
  var line = document.createElement("p")
  var text = document.createTextNode(text)

  line.appendChild(text)
  content.appendChild(line)
}
