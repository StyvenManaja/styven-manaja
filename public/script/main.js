document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
      };
  
      const res = await fetch('/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const result = await res.json();
      alert(result.message);
      form.reset();
    });
  });
  