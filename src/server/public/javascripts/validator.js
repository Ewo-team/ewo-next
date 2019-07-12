const validate = () => {
  const forms = document.querySelectorAll('form.validator');

  forms.forEach(form => {
    const fields = {};

    const inputs = form.querySelectorAll('input');
    const labels = form.querySelectorAll('label');
    const selects = form.querySelectorAll('select');

    inputs.forEach(input => {
      const name = input.getAttribute('name');
      fields[name] = { input };

      const rules = input.getAttributeNames().filter(a => a.startsWith('data-v-')).map(v => v.substr(7));

      fields[name].rules = rules;
    });

    labels.forEach(label => {
      const field = label.htmlFor;
      if (field !== null && fields[field] !== undefined) {
        fields[field].label = label.textContent;
      }
    });

    selects.forEach(select => {
      const options = select.querySelectorAll('option');
      options.forEach(option => {
        if (option.value === select.value) {
          option.selected = true;
        }
      });
    });

    form.addEventListener('change', (e) => {
      console.log('change');

      Object.keys(fields).forEach(field => {
        fields[field].rules.forEach(rule => {
          switch (rule) {
            case 'confirm':
              const confirmFieldName = fields[field].input.dataset.vConfirm
              const confirmFieldValue = fields[confirmFieldName].input.value;
              let error = "";
              const name = fields[field].label !== undefined ? fields[field].label : field;
              if (fields[field].input.value !== confirmFieldValue) {
                if (fields[field].input.dataset.vConfirmMessage !== undefined) {
                  error = fields[field].input.dataset.vConfirmMessage;
                } else {
                  const confirmName = fields[confirmFieldName].label !== undefined ? fields[confirmFieldName].label : confirmFieldName;
                  error = `${name} needs to be equal to ${confirmName}`
                }

              }

              fields[field].input.setCustomValidity(error);
              break;
          }
        });
      });

      //e.preventDefault();
      //console.log({ this: this, e });
    })

  });

}

function ready(fn) {
  // @ts-ignore
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  validate();
})