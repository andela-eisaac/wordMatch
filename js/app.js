var wordMatch = {
  word: "",
  definitionUrl: "",
  userInput: $('input').val("Enter word here"),

  inputClick: function () {
    this.userInput.click(function () {
      wordMatch.userInput.val("");
    });
  },

  searchClick: function (e) {
    e.preventDefault();
    this.word = wordMatch.userInput.bind(wordMatch).val().toLowerCase();
    console.log(this.word);
    $(".thes").html("");

    if (this.validator()) {
      this.definition();
      this.thesaurus();
    }  
  },

  returnWord: function () {
    this.definitionUrl = "http://api.wordnik.com:80/v4/word.json/" + this.word.trim() + "/definitions/";
    return this.definitionUrl;
  },

  returnThesaurusUrl: function () {
    this.thesaurusUrl = "http://words.bighugelabs.com/api/2/f5c79d25e5e8f8723ee62b695a8a7987/" + this.word.trim() + "/json";
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
    var definitionHTML = '<ul>';
    $.each (response, function (i, definition) {
      definitionHTML += '<li>';
      definitionHTML += '<p>';
      definitionHTML += definition.text;
      definitionHTML += '</p></li>';
    });
    definitionHTML += '</ul>';
    $('.def').html(definitionHTML);
    if (definitionHTML === '<ul></ul>') {
      alert('no match found for ' + wordMatch.word + ' in dictionary');
    }
  },

  thesaurusCallback: function (response) {
    console.log(response);
    thesaurusHTML = '<ul>';
    partNames = Object.keys(response);
    console.log(partNames); 
    var thesaurusHTML = '<ul>';
    $.each(response, function (i, partOfSpeech) {
      if (partOfSpeech.hasOwnProperty('syn')) {
        thesaurusHTML += '<li>';
        thesaurusHTML += '<p>';
        thesaurusHTML += '<span>';
        thesaurusHTML += 'Synonym: ';
        thesaurusHTML += '</span>';
        for (var i = 0; i < partOfSpeech.syn.length; i++) {
          thesaurusHTML += partOfSpeech.syn[i] + ', ';
        }
        thesaurusHTML += '</p></li>';
      }

      if (partOfSpeech.hasOwnProperty('ant')) {
        thesaurusHTML += '<li>';
        thesaurusHTML += '<p>';
        thesaurusHTML += '<span>';
        thesaurusHTML += 'Antonym: ';
        thesaurusHTML += '</span>';
        for (var i = 0; i < partOfSpeech.ant.length; i++) {
          thesaurusHTML += partOfSpeech.ant[i] + ', ';
        }
        thesaurusHTML += '<br></p></li>';
      }
    }); 

    if (response.hasOwnProperty('noun')) {
      thesaurusHTML += wordMatch.nounDef();
    }

    if (response.hasOwnProperty('verb')) {
      thesaurusHTML += wordMatch.verbDef();
    }

    if (response.hasOwnProperty('adjective')) {
      thesaurusHTML += wordMatch.adjectiveDef();
    }

    if (response.hasOwnProperty('adverb')) {
      thesaurusHTML += wordMatch.adverbDef();
    }

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
    $.getJSON(this.thesaurusUrl, this.thesaurusCallback).fail(function (jqXHR) {
      alert("No thesaurus result found for: " + wordMatch.word);
    });
  },

  //validator function
  validator: function () {
    if (this.word.trim() != "") {
      return true;
    } else {
      alert("please make a valid entry");
    }
  },

  nounDef: function () {
    var nounHTML = '<li><p class="define">';
    nounHTML += '"' + this.word + '"' + " is used as a Noun";
    nounHTML += '<br>';
    nounHTML += "A noun is a word used to name something: a person/animal";
    nounHTML += '<br>';
    nounHTML += "For more on Nouns, ";
    nounHTML += '<a href="http://www.edb.utexas.edu/minliu/pbl/ESOL/help/libry/speech.htm#noun">';
    nounHTML += "click here";
    nounHTML += '</a></p></li>';
    return nounHTML;
  },

  verbDef: function () {
    var verbHTML = '<li><p class="define">';
    verbHTML += '"' + this.word + '"' + " is used as a Verb";
    verbHTML += '<br>';
    verbHTML += "Verbs generally express action or a state of being";
    verbHTML += '<br>';
    verbHTML += "For more on Verbs, ";
    verbHTML += '<a href="http://www.edb.utexas.edu/minliu/pbl/ESOL/help/libry/speech.htm#verb">';
    verbHTML += "click here";
    verbHTML += '</a></p></li>';
    return verbHTML;
  },

  adjectiveDef: function () {
    var adjectiveHTML = '<li><p class="define">';
    adjectiveHTML += '"' + this.word + '"' + " is used as an Adjective";
    adjectiveHTML += '<br>';
    adjectiveHTML += "An adjective modifies (describes) a noun or pronoun.";
    adjectiveHTML += '<br>';
    adjectiveHTML += "For more on Adjectives, ";
    adjectiveHTML += '<a href="http://www.edb.utexas.edu/minliu/pbl/ESOL/help/libry/speech.htm#adjective">';
    adjectiveHTML += "click here";
    adjectiveHTML += '</a></p></li>';
    return adjectiveHTML;
  },

  adverbDef: function () {
    var adverbHTML = '<li><p class="define">';
    adverbHTML += '"' + this.word + '"' + " is used as an Adverb";
    adverbHTML += '<br>';
    adverbHTML += "An adverb is a word that modifies an action verb, an adjective or another adverb.";
    adverbHTML += '<br>';
    adverbHTML += "For more on Adverbs, ";
    adverbHTML += '<a href="http://www.edb.utexas.edu/minliu/pbl/ESOL/help/libry/speech.htm#adverb">';
    adverbHTML += "click here";
    adverbHTML += '</a></p></li>';
    return adverbHTML;
  },

  aboutClick: function () {
    $('#about').hide();
    $('.about').click(function (e) {
      e.preventDefault;
      $('#about').show();
    });
  }
};

wordMatch.aboutClick();
wordMatch.inputClick();
wordMatch.action();
