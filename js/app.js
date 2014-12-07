var wordMatch = {
  word: "",
  definitionUrl: "",

  searchClick: function (e) {
    e.preventDefault();
    this.word = $('input').val();
    console.log(this.word);
    this.definition();
    this.thesaurus();
  },

  returnWord: function () {
    this.definitionUrl = "http://api.wordnik.com:80/v4/word.json/" + this.word + "/definitions/";
    return this.definitionUrl;
  },

  returnThesaurusUrl: function () {
    this.thesaurusUrl = "http://words.bighugelabs.com/api/2/f5c79d25e5e8f8723ee62b695a8a7987/" + this.word + "/json";
    return this.thesaurusUrl;
  },

  action: function () {
    $('button').click(wordMatch.searchClick.bind(wordMatch));
  },

  definitionData: {
    limit: 3,
    includeRelated: "true",
    sourceDictionaries: "all",
    api_key: "724583fdf72680c36d0010ad78b03b1c4f3ea7b27c651f094"
  },

  definitionCallback: function (response) {
    console.log(response);
    definitionHTML = '<ul>';
    $.each (response, function (i, definition) {
      definitionHTML += '<li>';
      definitionHTML += '<p>';
      definitionHTML += definition.text;
      definitionHTML += '</p></li>';
    });
    definitionHTML += '</ul>';
    $('.def').html(definitionHTML);
  },

  thesaurusCallback: function (response) {
    console.log(response);
    thesaurusHTML = '<ul>';
    $.each (response, function (i, partsOfSpeech) {
      for (var syn in partsOfSpeech) {
        if (partsOfSpeech.hasOwnProperty(syn)) {
          console.log(partsOfSpeech.syn);
          thesaurusHTML += '<li>';
          thesaurusHTML += '<p>';
          thesaurusHTML += '<span>';
          thesaurusHTML += response.partsOfSpeech + ": ";
          thesaurusHTML += '</span>';
          for (var i = 0; i < partsOfSpeech.syn.length; i++) {
            thesaurusHTML += partsOfSpeech.syn[i] + ", ";
          }
          thesaurusHTML += '</p></li>';
        }
      }

      for (var ant in partsOfSpeech) {
        if (partsOfSpeech.hasOwnProperty(ant)) {
          console.log(partsOfSpeech.ant);
        }
      }
    });
    thesaurusHTML += '</ul>';
    $('.thes').html(thesaurusHTML);
  },

  //getting word definition
  definition: function () {
    this.returnWord();
    $.getJSON(this.definitionUrl, this.definitionData, this.definitionCallback);
  },

  //getting thesaurus
  thesaurus: function () {
    this.returnThesaurusUrl();
    $.getJSON(this.thesaurusUrl, this.thesaurusCallback);
  }
};

wordMatch.action();