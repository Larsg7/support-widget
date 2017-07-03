/**
 * PhysikOnline's support widget.
 *
 * It can be used to send support mails to the PHP-Script http://physikonline.uni-frankfurt.de/support-mail/api.php
 * which in turn will send a mail to our support address.
 * Include this file and the corresponding 'support-mail.css' file to activate this widget.
 *
 * Dependencies: jQuery, Bootstrap 3
 *
 * Author: Lars Gröber
 */

$(() => {
  $("body").append(`
<div id='support-mail-main'>
    <div id="support-mail-icon">
        <span class="glyphicon glyphicon-question-sign" id="support-mail-icon-icon"></span>
    </div>
    <div id="support-mail-form">
      <p id="support-mail-info">Du brauchst Hilfe oder hast einen Vorschlag zur Verbesserung unserer Dienste? Dann schreibe uns!</p>
      <div id="support-mail-errors"></div>
      <div id="support-mail-form-inputs">
          <div class="form-group">
            <label for="support-mail-name">Dein Name:</label>
            <input type="text" class="form-control" id="support-mail-name">
          </div>
          <div class="form-group">
            <label for="support-mail-email">Deine E-Mail:</label>
            <input type="email" class="form-control" id="support-mail-email">
          </div>
          <div class="form-group">
            <label for="support-mail-type">Art Deiner Nachricht:</label>
            <select class="form-control" id="support-mail-type">
                <option value="support">Supportanfrage</option>
                <option value="bug">Fehlermeldung</option>
                <option value="feature">Neues Feature</option>
                <option value="enhancement">Verbesserungsvorschlag</option>
                <option value="other">Etwas anderes</option>
            </select>
          </div>
          <div class="form-group">
            <label for="support-mail-subject">Betreff:</label>
            <input type="text" class="form-control" id="support-mail-subject">
          </div>
          <div class="form-group">
            <label for="support-mail-body">Deine Nachricht:</label>
            <textarea class="form-control" rows="5" id="support-mail-body"></textarea>
          </div>
          <button class="btn btn-default" id="support-mail-submit">Absenden</button>
          <div id="support-mail-poweredByPO">Build with <span style="color: #FF8E8E;font-size: 140%;">♥</span> by <a href="https://physikonline.uni-frankfurt.de">PhysikOnline</a></div>
      </div>
    </div>
</div>
`);

  // toggle window
  $('#support-mail-icon').click(() => {
    $('#support-mail-form').slideToggle();
    $('#support-mail-icon-icon').toggleClass('glyphicon-question-sign glyphicon-menu-down glyphicon-chevron-down');
  });

  // submit form
  $('#support-mail-submit').click(() => {
    let check = checkForm();
    if (check) {
      $.get('http://physikonline.uni-frankfurt.de/support-mail/api.php', check, (data) => {
        showErrors("");
        $('#support-mail-errors').html(`<div class="alert alert-success">
                    <div id="support-mail-error-smiley">:)</div>
                    Deine Nachricht wurde erfolgreich verschickt!
                    <br>
                    Wir werden uns so schnell wie möglich um Dein Anliegen kümmern!</div>`);
        removeInputs();
      }).fail((error) => {
        sendError(error);
      })
    }

    let sendError = (error) => {
      showErrors(`<div id="support-mail-error-smiley">:(</div>
                        Sorry, irgendetwas hat nicht funktioniert!
                        <br>
                        Bitte kontaktiere uns über <a href="team@elearning.physik.uni-frankfurt.de">team@elearning-physik.uni-frankfurt.de</a>.<br>
                        Der Server hat mit '${error.statusText}: ${error.responseText}' geantwortet.`);
      console.log(error);
      removeInputs();
    }
  });

  // check if all field were filled in
  let checkForm = () => {
    let values = {};
    if (!(values["user_name"] = $('#support-mail-name').val())) {
      showErrors('Bitte gebe Deinen Namen an.');
      return false;
    }
    if (!(values["user_mail"] = $('#support-mail-email').val())) {
      showErrors('Bitte gebe Deine E-Mail an, so dass wir Dir antworten können.');
      return false;
    }
    if (!validateEmail(values["user_mail"])) {
      showErrors('Bitte gebe eine valide E-Mail an.');
      return false;
    }
    if (!(values["subject"] = $('#support-mail-subject').val())) {
      showErrors('Bitte gebe einen Betreff an.');
      return false;
    }
    if (!(values["body"] = $('#support-mail-body').val())) {
      showErrors('Bitte beschreibe Dein Anliegen.');
      return false;
    }
    values["message_type"] = $('#support-mail-type').val();
    showErrors("");
    return values;
  };

  let showErrors = (errorText) => {
    let html = errorText ? `<div class="alert alert-danger">${errorText}</div>` : "";
    $('#support-mail-errors').html(html);
  };

  // hide form inputs and info text
  let removeInputs = () => {
    $('#support-mail-info').hide();
    $('#support-mail-form-inputs').slideUp();
    $('#support-mail-errors .alert').css('margin-bottom', 0);
  }

  let validateEmail = (email) => {
    let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Za-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
    return re.test(email);
  }
});