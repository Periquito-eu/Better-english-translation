// Translation App - Main JavaScript

// DOM Elements
const spanishInput = document.getElementById('spanish-input');
const englishOutput = document.getElementById('english-output');
const translateBtn = document.getElementById('translate-btn');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');
const loading = document.getElementById('loading');
const inputCount = document.getElementById('input-count');

// Event Listeners
spanishInput.addEventListener('input', updateCharCount);
translateBtn.addEventListener('click', translateText);
clearBtn.addEventListener('click', clearAll);
copyBtn.addEventListener('click', copyTranslation);

// Initialize
updateCharCount();

// Update character count
function updateCharCount() {
    const count = spanishInput.value.length;
    inputCount.textContent = `${count} caracteres`;
}

// Clear all fields
function clearAll() {
    spanishInput.value = '';
    englishOutput.value = '';
    copyBtn.style.display = 'none';
    updateCharCount();
    spanishInput.focus();
}

// Copy translation to clipboard
async function copyTranslation() {
    try {
        await navigator.clipboard.writeText(englishOutput.value);
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="btn-icon">✓</span>Copiado';
        copyBtn.style.background = '#10b981';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
        }, 2000);
    } catch (err) {
        console.error('Error copying text:', err);
        alert('No se pudo copiar el texto');
    }
}

// Main translation function
async function translateText() {
    const text = spanishInput.value.trim();
    
    if (!text) {
        alert('Por favor, ingresa un texto en español para traducir.');
        spanishInput.focus();
        return;
    }
    
    // Disable button and show loading
    translateBtn.disabled = true;
    loading.style.display = 'flex';
    englishOutput.value = '';
    copyBtn.style.display = 'none';
    
    try {
        // Try multiple translation methods
        const translation = await performTranslation(text);
        
        // Display result
        englishOutput.value = translation;
        englishOutput.classList.add('success');
        copyBtn.style.display = 'flex';
        
        setTimeout(() => {
            englishOutput.classList.remove('success');
        }, 500);
        
    } catch (error) {
        console.error('Translation error:', error);
        englishOutput.value = 'Error: No se pudo realizar la traducción. Por favor, intenta nuevamente.';
        englishOutput.classList.add('error');
        
        setTimeout(() => {
            englishOutput.classList.remove('error');
        }, 500);
    } finally {
        // Re-enable button and hide loading
        translateBtn.disabled = false;
        loading.style.display = 'none';
    }
}

// Perform translation using multiple methods
async function performTranslation(text) {
    // Method 1: Try LibreTranslate API (free, open-source)
    try {
        const result = await translateWithLibreTranslate(text);
        return enhanceTranslation(result);
    } catch (error) {
        console.log('LibreTranslate failed, trying alternative method:', error.message);
    }
    
    // Method 2: Try MyMemory Translation API (free)
    try {
        const result = await translateWithMyMemory(text);
        return enhanceTranslation(result);
    } catch (error) {
        console.log('MyMemory failed, trying alternative method:', error.message);
    }
    
    // Method 3: Fallback to a basic transformation with improvements
    return enhanceTranslation(await basicTranslate(text));
}

// LibreTranslate API
async function translateWithLibreTranslate(text) {
    const response = await fetch('https://libretranslate.com/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: text,
            source: 'es',
            target: 'en',
            format: 'text'
        })
    });
    
    if (!response.ok) {
        throw new Error(`LibreTranslate API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.translatedText;
}

// MyMemory Translation API
async function translateWithMyMemory(text) {
    const encodedText = encodeURIComponent(text);
    const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=es|en`
    );
    
    if (!response.ok) {
        throw new Error(`MyMemory API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.responseStatus !== 200) {
        throw new Error('MyMemory translation failed');
    }
    
    return data.responseData.translatedText;
}

// Basic fallback translation (demonstration mode)
async function basicTranslate(text) {
    // This is a fallback that shows the app structure works
    // In production, you would need a proper translation API
    return `[Demo Mode] Translation: ${text}\n\nNote: Please configure a translation API key for full functionality. This application is designed to provide formal, elegant English translations with appropriate synonyms and natural language.`;
}

// Enhance translation to be more formal and elegant
function enhanceTranslation(translation) {
    // Apply basic enhancements for formality
    let enhanced = translation;
    
    // Common informal to formal replacements
    const formalizations = {
        "don't": "do not",
        "can't": "cannot",
        "won't": "will not",
        "shouldn't": "should not",
        "wouldn't": "would not",
        "couldn't": "could not",
        "isn't": "is not",
        "aren't": "are not",
        "wasn't": "was not",
        "weren't": "were not",
        "hasn't": "has not",
        "haven't": "have not",
        "hadn't": "had not",
        "doesn't": "does not",
        "didn't": "did not",
        " ok ": " acceptable ",
        " OK ": " acceptable ",
        " gonna ": " going to ",
        " wanna ": " want to ",
        " gotta ": " have to ",
        " yeah ": " yes ",
        " yep ": " yes ",
        " nope ": " no ",
        " stuff ": " items ",
        " things ": " matters ",
        " get ": " obtain ",
        " got ": " obtained ",
        " kids ": " children ",
        " guys ": " individuals ",
        " hi ": " hello ",
        " hey ": " hello ",
        " bye ": " goodbye "
    };
    
    // Apply formalizations (case-insensitive)
    for (const [informal, formal] of Object.entries(formalizations)) {
        const regex = new RegExp(informal, 'gi');
        enhanced = enhanced.replace(regex, (match) => {
            // Preserve the case of the first letter
            if (match[0] === match[0].toUpperCase()) {
                return formal.charAt(0).toUpperCase() + formal.slice(1);
            }
            return formal;
        });
    }
    
    // Capitalize first letter of sentences
    enhanced = enhanced.replace(/(^\w|[.!?]\s+\w)/g, letter => letter.toUpperCase());
    
    return enhanced;
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to translate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!translateBtn.disabled) {
            translateText();
        }
    }
    
    // Ctrl/Cmd + K to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        clearAll();
    }
});

// Auto-resize textareas
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

spanishInput.addEventListener('input', () => autoResize(spanishInput));
