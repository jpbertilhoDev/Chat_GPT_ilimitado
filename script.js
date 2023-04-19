const inputQuestion = document.getElementById
("inputQuestion");
const result = document.getElementById("result");

inputQuestion.addEventListener("keypress", (e) => {
    if (inputQuestion.value && e.key === "Enter")
    SendQuestion();
});

const OPENAI_API_KEY = "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";

function SendQuestion(){
    let sQuestion = inputQuestion.value;

    fetch("https://api.openai.com/v1/completions",{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`

        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: sQuestion,
            max_tokens: 3000,
            temperature: 0.8,
        }),
    })

        .then((response) => response.json()) 
        .then((json) => {
            if (result.value) result.value += "\n";

            if (json.error?.message) {
                result.value += `Erro: ${json.error.message}`;
            }   else if (json.choices?.[0].text) {
                    let text = json.choices[0].text || "Sem resposta";

                result.value += "Chat GPT: " + text;
            }
                result.scrollTop = result.scrollHeight;
        })
        .catch((error) => console.error("Error:", error))
        .finally (() => {
            inputQuestion.value = "";
            inputQuestion.disabled = false;
            inputQuestion.focus();
        });

    if (result.value) result.value += "\n\n\n";

    result.value += `Eu: ${sQuestion}`;
    inputQuestion.value = "Carregando...";
    inputQuestion.disabled = true;

    result.scrollTop = result.scrollHeight;
}