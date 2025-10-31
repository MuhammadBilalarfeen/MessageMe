// Import jQuery first
import $ from "jquery"
import Rails from "@rails/ujs"
Rails.start()

import "channels/chatroom_channel"

// Import Turbo + Stimulus
import "@hotwired/turbo-rails"
import "controllers"

// Import Semantic UI AFTER jQuery
import "semantic-ui-css/semantic.min.js"

// Initialize Semantic UI widgets
const initSemanticUI = () => {
  $(".ui.dropdown").dropdown()
  $(".ui.accordion").accordion()
  $(".ui.checkbox").checkbox()

  // Flash messages dismiss
  $(".message .close").off("click").on("click", function () {
    $(this).closest(".message").transition("fade")
  })
}

// Re-initialize after Turbo navigation
document.addEventListener("turbo:load", initSemanticUI)
document.addEventListener("turbo:render", initSemanticUI)

// Scroll to bottom function
const scroll_bottom = () => {
  const messages = $('#messages')
  if (messages.length > 0) {
    messages.scrollTop(messages[0].scrollHeight)
  }
}

submit_message = function () {
  $('#message_body').on('keydown', function (e) {
    if (e.keyCode == 13) {
      $('button').click();
    }
  });
  submit_message();
  scroll_bottom();
}

// Single turbo:load listener for forms and buttons
document.addEventListener("turbo:load", () => {
  scroll_bottom()

  // Message form
  const form = document.getElementById("new_message")
  const button = document.getElementById("send-btn")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault() // Stops page reload
    })

    form.addEventListener("ajax:success", () => {
      form.reset() // Clear input after successful message
    })

    form.addEventListener("ajax:error", () => {
      console.log("Message failed to send")
    })
  }

  if (button && form) {
    button.addEventListener("click", () => {
      const formData = new FormData(form)

      fetch(form.action, {
        method: "POST",
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: formData
      })
        .then(response => {
          if (response.ok) {
            form.reset() // clear input
          } else {
            console.error("Message failed to send")
          }
        })
        .catch(error => console.error(error))
    })
  }
})

