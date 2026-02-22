const courseEnrollementemail = (name, courseName) => {
  return `
    <div>
      <h1>Congratulations ${name} 🎉</h1>
      <p>You have successfully enrolled in <b>${courseName}</b>.</p>
      <p>Happy Learning 🚀</p>
    </div>
  `;
};

module.exports = courseEnrollementemail;
