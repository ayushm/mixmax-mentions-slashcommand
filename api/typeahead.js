//var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The Type Ahead API.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  if (!term) {
    res.json([{
      title: '<i>search your contacts (or superheroes)</i>',
      text: ''
    }]);
    return;
  }

  // TODO: Search user's actual google contact list (requires auth)

  var sampleResponse = [
    {name:"Clark Kent", email:"superman@gmail.com", imageUrl: "data:image/jpeg;base64,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"},    
    {name:"Bruce Wayne", email:"batman@gmail.com", imageUrl: "data:image/jpeg;base64,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"},
    {name:"Thor", email:"thor@gmail.com", imageUrl: "data:image/jpeg;base64,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"},
    {name:"Tony Stark", email:"ironman@gmail.com", imageUrl: "data:image/jpeg;base64,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"},
    {name:"Peter Parker", email:"spiderman@gmail.com", imageUrl: "data:image/jpeg;base64,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"},
    {name:"Bruce Banner", email:"hulk@gmail.com", imageUrl: "data:image/jpeg;base64,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"},
    {name:"Black Widow", email:"blackwidow@gmail.com", imageUrl: "data:image/jpeg;base64,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"},
    {name:"Nick Fury", email:"nickfury@gmail.com", imageUrl: "data:image/jpeg;base64,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"},
    {name:"James Logan", email:"wolverine@gmail.com", imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAEgASAMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAABQYHCAIDBAH/xAA2EAACAQMDAwEFBgQHAAAAAAABAgMABBEFBhIhMUEHExQiUWFxgZGhsdEjMoLwFRYkJURicv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCaq9yAMntWGahr1j9R5rR73a+nW7RuVC3FyzDJDAHC4PTv3PX6UDs3h6q6Jtq5S1jR9QmLMsggYBYyMdCfv8Z7U05vXuNZJxDoZdensM3GM/Pl0qDXd5GLOxY/MmvFRicAUFoNo+qOma/ETd276awcJ/GfKnIPXlgf2afFpd295F7S1mjmTtyRgRVSNLF2NPkgSYr7b+ReXQnxg+PH405fT7c1/ot/HM8hxng8fJjyA7hu4/b8qCzNFaLG7ivrSG6t25RSoGU/bW+gKKKKBM1OeSDT7maBGeWOJmRUGSSAcAD51Tm6knuLuV7jm07uS/PuWz1z9atT6h6jNpmztUurS6W2uEhzGzHqTkZA+pGaq3pYMmpW4OSzSDP1oFrSNnahqQIjMcZ/75p12HpXqEkq+0uU5Eg/CMAY8069qRIAjHALYFSBZIodTjrnvQR7pfpUkEgNzeFlSXmqAfyjJP7fgKQ/UfYX+X9AOoaRPNwjmzKjNn4W8/jU4jhy+tcO47BNS0O8tHTkJIyMfM0DH9EL3UYorvSr/kYPZie2JbIXrhlHnyDUr1C2xNTOmbxisZFEdsQykv0CApkHPz6Y+RB8GpnjcOgZc4PbNBlRRRQMv1E2/BuLbV1BMDyhQzRMpwQyg/j5quWh2EltuRbS4HCVM5B8HFWzYAggjIIwRUIbs2xJou6H1WaNngml4iYKcKGGFz46EAf1H5UHRoWqvbXEizWM4WM4DsyID9nJhmpC0nWobsLG9vPBJgMokUfH46EHr3FNrRrG2uHFxOiOSAOLdexz+tbtyaokOr6ZHGfiWcOxH16Ggduo6n/hUZka2dlHdicYrt027lvEWRkj4MOnF8kfaCK2yQxXUaNKivgeVz3rcOKIAoCqo8eBQMjaO3PeLuTUpnBlgunRGV2VgFYr1HY5HSpEFIWgXFvOx9zbPX2kpUfBls9AfPX5Uu0BRRRQcDGkfdjgbc1HkhkBgYcQM5pUdq0yFXBRwCrDBoIs0G/WIcZZOCAFnc+AO/6isJJU1PdFtPDbNIisB0bHBRk5/s03Lm5Oj6lcWd0vSCSSHJ7MuSMH8qdu2ZBN/qY+bDIHwyFev2UEl291C8a+zPwgDqTXV7QMqle3ek61dfd/4iEYHYtmt1qSUXAPAfnQZbTsJtN0K0t7sAXQjX23HsGxjA+lLFRN6kb+1Xa2t6WLO7t2hkRmntXhByAQMls569cYx289qXNm+qmgbkPu80o0295YENy44yfVX7H7O9A/qKxByBRQIskoGTnoO9Rb6i+p8NhHJpu3ZkmvGBWS6Q5WH/z82/IUUUDD0D/erFo7t2llcsGkdiWJznJPfPXvTv2JHeW16LFihZWwPa5B6fXzRRQSpBayqg95kVhjHFAf1rtnubbT7CW6vJkgt4U5PI5wFAoooKr721wbh3LfaknMRSyEQK/dYx0X9/vpBJoooHftT1J3JtjhFa3vvFov/FuhzT7j3X7jiiiig//Z"},
    {name:"Wade Wilson", email:"deadpool@gmail.com", imageUrl: "data:image/jpeg;base64,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"}
  ];  

  var results = _.chain(sampleResponse)
    .reject(function(contact) {
      return (contact.name.toUpperCase().indexOf(term.toUpperCase()) === -1 && contact.email.toUpperCase().indexOf(term.toUpperCase()) === -1);
    })
    .map(function(contact) {
      return {
        title: '\
          <div style="min-height: 50px;font-family: \'proxima-nova\', \'Avenir Next\', \'Segoe UI\', \'Calibri\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;">\
            <img src="' + contact.imageUrl + '" style="float: left; width: 45px; border-radius: 100px;"/>\
            <div id="name-email-container" style="float: left; margin-left: 10px; margin-top: 5px;">\
              <div id="name" style="float: left; font-size: 12pt; font-weight: 600; font-">' + contact.name + '</div><br>\
              <div id="email" style="float: left; font-size: 10pt;"><i>' + contact.email + '</i></div>\
            </div>\
          </div>\
        ',
        text: '@@@' + contact.name + '@@@' + contact.email + '@@@'
      };
    })
    .value();

  if (results.length === 0) {
    res.json([{
      title: '<i>(no results)</i>',
      text: ''
    }]);
  } else {
    res.json(results);
  }


};