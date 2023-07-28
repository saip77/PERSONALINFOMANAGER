// Function to save the user's personal information to Chrome storage
function saveInfo() {
  const githubLink = document.getElementById('githubLink').value;
  const resumeLink = document.getElementById('resumeLink').value;
  const linkedinProfile = document.getElementById('linkedinProfile').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  const userInfo = {
    githubLink,
    resumeLink,
    linkedinProfile,
    email,
    phone,
  };

  chrome.storage.sync.set({ userInfo }, () => {
    alert('Personal information saved!');
  });
}

// Function to copy the individual information to the clipboard
function copyInfo(event) {
  const inputField = event.target.parentElement.querySelector('input');
  const infoText = inputField.value.trim();

  if (infoText) {
    // Create a temporary input element
    const tempInput = document.createElement('input');
    tempInput.type = 'text';
    tempInput.value = infoText;
    document.body.appendChild(tempInput);

    // Select the text in the input field
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text to the clipboard
    document.execCommand('copy');

    // Remove the temporary input
    document.body.removeChild(tempInput);

    alert(`${inputField.placeholder} copied to clipboard!`);
  } else {
    alert('Please enter valid information before copying.');
  }
}

// Add event listener to each copy icon
const copyIcons = document.querySelectorAll('.copy-icon');
copyIcons.forEach(icon => {
  icon.addEventListener('click', copyInfo);
});

// Function to display the saved personal information
function displayInfo() {
  chrome.storage.sync.get('userInfo', (data) => {
    const userInfo = data.userInfo;
    if (userInfo) {
      document.getElementById('githubLink').value = userInfo.githubLink || '';
      document.getElementById('resumeLink').value = userInfo.resumeLink || '';
      document.getElementById('linkedinProfile').value = userInfo.linkedinProfile || '';
      document.getElementById('email').value = userInfo.email || '';
      document.getElementById('phone').value = userInfo.phone || '';
    }
  });
}

// Call displayInfo when the popup is loaded
document.addEventListener('DOMContentLoaded', displayInfo);

// Event listener to save the personal information
document.getElementById('saveBtn').addEventListener('click', saveInfo);
