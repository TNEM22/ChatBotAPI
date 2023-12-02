// Create new response input
var number_of_intents = 1;

function buildModel() {
  const downloadButton = document.getElementById("downloadModel");
  downloadButton.classList.add("disabled");
  downloadButton.classList.add("animeButton");
  let intents = {};
  let intentsArray = [];
  for (let index = 1; index <= number_of_intents; index++) {
    var intent = {};
    const tag = document.getElementById("tag" + index);
    const pattern = document.getElementById("pattern" + index);
    const response = document.getElementById("response" + index);

    if (tag.value === null || tag.value === "" || tag.value === " ") {
      alert("tags required");
    } else if (
      pattern.value === null ||
      pattern.value === "" ||
      pattern.value === " "
    ) {
      alert("patterns required");
    } else if (
      response.value === null ||
      response.value === "" ||
      response.value === " "
    ) {
      alert("responses required");
    } else {
      intent["tag"] = tag.value.trim();
      var patterns = pattern.value.split(",");
      for (let i = 0; i < patterns.length; i++) {
        patterns[i] = patterns[i].trim();
      }
      intent["patterns"] = patterns;
      var responses = response.value.split(",");
      for (let i = 0; i < responses.length; i++) {
        responses[i] = responses[i].trim();
      }
      intent["responses"] = responses;

      intentsArray.push(intent);
    }
  }
  intents["intents"] = intentsArray;
  // console.log(intents);
  fetch("/build", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(intents),
  })
    .then((response) => {
      response.json();
    })
    .then((responseData) => {
      downloadButton.classList.remove("animeButton");
      downloadButton.classList.remove("disabled");
      console.log(responseData);
    });
}

function addIntent(id) {
  var num = parseInt(id[id.length - 1]);
  const addButton = document.getElementById("addIntent");
  const deleteButton = document.getElementById("deleteIntent");

  const intents = document.getElementById("intents");
  const intent = document.createElement("div");
  intent.className = "intent";
  intent.id = "intent" + (num + 1);
  intent.appendChild(document.createElement("hr"));

  // #### Header ####
  const head = document.createElement("div");
  head.className = "overlap-header";
  const headText = document.createElement("div");
  headText.className = "text";
  headText.innerText = "Intent " + (num + 1);
  head.appendChild(headText);
  intent.appendChild(head);
  // #### Header ####

  // #### Tag ####
  const intentTag = document.createElement("div");
  intentTag.className = "intent-row";
  const tagLabel = document.createElement("div");
  tagLabel.className = "intent-label";
  tagLabel.innerText = "Tag";

  intentTag.appendChild(tagLabel);
  const tagInput = document.createElement("input");
  tagInput.type = "text";
  tagInput.className = "text-wrapper";
  tagInput.name = "tag" + (num + 1);
  tagInput.id = "tag" + (num + 1);
  tagInput.placeholder = "Enter the tag..";

  intentTag.appendChild(tagInput);
  intent.appendChild(intentTag);
  // #### Tag ####

  // #### Patterns ####
  const intentPatterns = document.createElement("div");
  intentPatterns.className = "intent-row";
  const patternLabel = document.createElement("div");
  patternLabel.className = "intent-label";
  patternLabel.innerText = "Patterns";

  intentPatterns.appendChild(patternLabel);
  const patternInput = document.createElement("input");
  patternInput.type = "text";
  patternInput.className = "text-wrapper";
  patternInput.name = "pattern" + (num + 1);
  patternInput.id = "pattern" + (num + 1);
  patternInput.placeholder = "Separate patterns by the comma";

  intentPatterns.appendChild(patternInput);
  intent.appendChild(intentPatterns);
  // #### Patterns ####

  // #### Responses ####
  const intentResponses = document.createElement("div");
  intentResponses.className = "intent-row";
  const responseLabel = document.createElement("div");
  responseLabel.className = "intent-label";
  responseLabel.innerText = "Responses";

  intentResponses.appendChild(responseLabel);
  const responseInput = document.createElement("input");
  responseInput.type = "text";
  responseInput.className = "text-wrapper";
  responseInput.name = "response" + (num + 1);
  responseInput.id = "pattern" + (num + 1);
  responseInput.placeholder = "Separate responses by the comma";

  intentResponses.appendChild(responseInput);
  intent.appendChild(intentResponses);
  // #### Responses ####

  intents.appendChild(intent);
  addButton.setAttribute("onclick", "addIntent('intent" + (num + 1) + "')");
  deleteButton.setAttribute(
    "onclick",
    "deleteIntent('intent" + (num + 1) + "')"
  );
  number_of_intents += 1;
}

function deleteIntent(id) {
  var num = parseInt(id[id.length - 1]);
  if (num > 1) {
    const intent = document.getElementById("intent" + num);
    intent.remove();

    const addButton = document.getElementById("addIntent");
    const deleteButton = document.getElementById("deleteIntent");

    addButton.setAttribute("onclick", "addIntent('intent" + (num - 1) + "')");
    deleteButton.setAttribute(
      "onclick",
      "deleteIntent('intent" + (num - 1) + "')"
    );
    number_of_intents -= 1;
  }
}

function download(url) {
  const a = document.createElement("a");
  a.href = url;
  a.download = url.split("/").pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
