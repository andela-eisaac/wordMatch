var wordMatch = {
  word: "",
  definitionUrl: "",

  searchClick: function (e) {
    e.preventDefault();
    this.word = $('input').val();
    console.log(this.word);
    this.definition();
  },

  returnWord: function () {
    this.definitionUrl = "http://api.wordnik.com:80/v4/word.json/" + this.word + "/definitions/";
    return this.definitionUrl;
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
    $.each(response, function (i, definition) {
      definitionHTML += '<li>';
      definitionHTML += '<p>';
      definitionHTML += definition.text;
      definitionHTML += '</p></li>';
    });
    definitionHTML += '</ul>';
    $('.definition').html(definitionHTML);
  },

  //getting word definition
  definition: function () {
    this.returnWord();
    $.getJSON(this.definitionUrl, this.definitionData, this.definitionCallback);
  }
};

wordMatch.action();