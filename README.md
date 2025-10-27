# CV Maker Tool

A professional CV maker built with Next.js, TypeScript, and SeraUI-inspired components. Create beautiful, ATS-friendly CVs and download them as PDF.

![CV Maker Preview](https://seraui.com/images/rose.webp)

## Features

- ✨ **Professional Design**: Clean, modern CV template inspired by the attached design
- 📝 **Complete CV Sections**: Personal info, contact, work experience, education, skills, languages, and references
- 🎨 **SeraUI Components**: Beautiful, accessible UI components with smooth animations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 💾 **Auto-Save**: Your progress is automatically saved to local storage
- 📄 **PDF Export**: Download your CV as a high-quality PDF file
- 🔄 **Live Preview**: See your CV in real-time as you edit

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cv-maker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

### 1. Fill in Your Information
- Navigate through different sections using the sidebar
- **Personal Info**: Add your name, job title, profile summary, and optional profile image
- **Contact**: Enter your phone, email, address, and optional website/social links
- **Work Experience**: Add your job history with responsibilities
- **Education**: Include your academic background
- **Skills**: List your professional skills
- **Languages**: Add languages you speak with proficiency levels
- **References**: Include professional references

### 2. Live Preview
- See your CV update in real-time as you make changes
- On mobile, switch between "Edit" and "Preview" tabs
- On desktop, both form and preview are visible side-by-side

### 3. Download as PDF
- Click the "Download PDF" button for a professionally generated PDF using react-pdf/renderer
- Alternatively, use "Print PDF" to use your browser's print dialog
- The filename will automatically include your name
- PDFs maintain perfect formatting and typography

## Project Structure

```
src/
├── app/                  # Next.js app directory
├── components/
│   ├── ui/              # Reusable UI components (Button, Input, Card, etc.)
│   ├── forms/           # Form components for each CV section
│   ├── CVPreview.tsx    # CV preview component
│   ├── CVMaker.tsx      # Main application component
│   └── PDFExport.tsx    # PDF generation functionality
├── types/
│   └── cv.ts           # TypeScript interfaces and data models
└── lib/
    └── utils.ts        # Utility functions
```

## Key Technologies

- **Next.js 16**: React framework with app directory
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations
- **@react-pdf/renderer**: Professional PDF generation
- **Lucide React**: Beautiful icons

## Customization

### Changing the CV Template
To modify the CV design, edit the `CVPreview.tsx` component. The current design matches the attached professional template.

### Adding New Sections
1. Add the new section interface to `src/types/cv.ts`
2. Create a form component in `src/components/forms/`
3. Update the `CVPreview` component to display the new section
4. Add the section to the navigation in `CVMaker.tsx`

### Styling
The application uses Tailwind CSS for styling. Modify the classes in components to change the appearance.

## PDF Export Notes

- **Two export options available**:
  1. **Download PDF**: Uses @react-pdf/renderer for pixel-perfect PDF generation
  2. **Print PDF**: Uses browser's native print functionality
- The PDF layout is optimized for A4 paper size
- Professional typography and spacing maintained
- Images are supported (profile pictures from HTTP URLs work best)
- No dependency on external services - everything works offline

## Data Persistence

- CV data is automatically saved to browser's local storage
- Data persists between sessions
- No server or account required

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and SeraUI design principles.
