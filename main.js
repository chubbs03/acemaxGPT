const { createApp } = Vue;

createApp({
  data() {
    return {
      userInput: '',
      messages: [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'assistant', content: 'HI !!! acemax is ready to help 🫶🏻' }
],
      isTyping: false
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;

      this.messages.push({ role: 'user', content: this.userInput });
      const userMessage = this.userInput;
      this.userInput = '';
      this.isTyping = true;

      try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sk-34c1116b28e24ad4add008420062d489' 
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: this.messages,
            stream: false
          })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || '(No reply)';
        this.messages.push({ role: 'assistant', content: reply });
      } catch (err) {
        this.messages.push({ role: 'assistant', content: '❌ Error talking to API.' });
        console.error(err);
      } finally {
        this.isTyping = false;
      }
    }
  }
}).mount('#app');
