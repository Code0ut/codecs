document.addEventListener('DOMContentLoaded', () => {
	const blocks = document.querySelectorAll('pre > code');
	blocks.forEach((code) => {
		const pre = code.parentElement;

		const wrapper = document.createElement('div');
		wrapper.className = 'code-wrapper';
		pre.parentNode.insertBefore(wrapper, pre);
		wrapper.appendChild(pre);

		const btn = document.createElement('button');
		btn.className = 'copy-btn';
		btn.type = 'button';
		btn.setAttribute('aria-label', 'Copy code to clipboard');
		btn.innerText = 'Copy';
		wrapper.appendChild(btn);

		btn.addEventListener('click', async () => {
			const raw = code.innerText || code.textContent || '';
			const text = raw.replace(/^\n+|\n+$/g, '');
			try {
				if (navigator.clipboard && navigator.clipboard.writeText) {
					await navigator.clipboard.writeText(text);
				} else {
					const ta = document.createElement('textarea');
					ta.value = text;
					ta.style.position = 'fixed';
					ta.style.left = '-9999px';
					document.body.appendChild(ta);
					ta.select();
					document.execCommand('copy');
					document.body.removeChild(ta);
				}
				const original = btn.innerText;
				btn.innerText = 'Copied!';
				btn.disabled = true;
				setTimeout(() => {
					btn.innerText = original;
					btn.disabled = false;
				}, 1200);
			} catch (e) {
				btn.innerText = 'Error';
				setTimeout(() => (btn.innerText = 'Copy'), 1200);
			}
		});
	});
});
