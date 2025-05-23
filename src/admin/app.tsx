import "./custom.scss";
import {
  defaultHtmlPreset,
  setPluginConfig,
} from "@_sh/strapi-plugin-ckeditor";
import { GeneralHtmlSupport, Indent } from "ckeditor5";
const customStyles = document.createElement("link");
customStyles.href = "/admin/custom.css";
customStyles.rel = "stylesheet";
document.head.appendChild(customStyles); // TODO: Need to check alternative  solution for this
const modifiedHtmlPreset = {
  ...defaultHtmlPreset,
  description: "Modified default HTML editor with Montserrat font family",
  editorConfig: {
    ...defaultHtmlPreset.editorConfig,
    plugins: [
      ...(defaultHtmlPreset.editorConfig.plugins || []),
      GeneralHtmlSupport,
      Indent,
    ],
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "fontFamily",
      "fontSize",
      "fontColor",
      "style",
      "fontBackgroundColor",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "imageUpload",
      "blockQuote",
      "insertTable",
      "|",
      "undo",
      "redo",
      "strapiMediaLib",
      "indent",
      "outdent",
    ],
    link: {
      addTargetToExternalLinks: true, // Automatically adds target="_blank" for external links
      defaultTarget: "_blank", // Ensures all links open in a new tab
      decorators: {
        openInNewTab: {
          mode: "manual",
          label: "Open in a new tab",
          attributes: {
            target: "_blank",
            rel: "noopener noreferrer",
          },
        },
      },
    },
    list: {
      properties: {
        styles: false, // Removes bullet shape options
        startIndex: true,
        reversed: true,
      },
    },
    fontFamily: {
      options: [
        "default",
        "Arial, sans-serif",
        "Courier New, Courier, monospace",
        "Georgia, serif",
        "Times New Roman, Times, serif",
        "Verdana, sans-serif",
        "Montserrat, sans-serif",
        "Montserrat Regular, sans-serif",
      ],
      supportAllValues: true,
    },
    fontSize: {
      options: [
        "default",
        "10px",
        "11px",
        "12px",
        "13px",
        "14px",
        "16px",
        "18px",
        "20px",
        "24px",
        "28px",
      ],
      supportAllValues: true,
    },
    fontColor: {
      colors: [
        { color: "#e6292e", label: "Red 1 #e6292e" },
        { color: "#fb004e", label: "Red 2 #fb004e" },
        { color: "#f2063a", label: "Red 3 #f2063a" },
        { color: "#ce1c43", label: "Red 4 #ce1c43" },
        { color: "#1c1c1c", label: "Dark Grey 1 #1c1c1c" },
        { color: "#000000", label: "Black #000000" },
        { color: "#747474", label: "Grey #747474" },
        { color: "#343a40", label: "Dark Grey 2 #343a40" },
        { color: "#4679fa", label: "Blue #4679fa" },
        { color: "#0e0941", label: "Dark Blue 1 #0e0941" },
        { color: "#141430", label: "Dark Blue 2 #141430" },
        { color: "#ffffff", label: "White #ffffff" },
      ],
      columns: 6,
    },
    style: {
      definitions: [
        { name: "Title", element: "p", classes: ["title"] },
        { name: "Sub-title", element: "p", classes: ["sub-title"] },
        { name: "Sub-title-list", element: "li", classes: ["sub-title"] },
        { name: "section-title", element: "p", classes: ["section-title"] },
        { name: "Description", element: "p", classes: ["description"] },

        {
          name: "banner-description-text",
          element: "p",
          classes: ["banner-description-text"],
        },
        {
          name: "Bold Description",
          element: "p",
          classes: ["bold-description"],
        },
        {
          name: "Bold ordered list",
          element: "ol",
          classes: ["bold-description"],
        },
        { name: "Kudos Mail", element: "p", classes: ["kudos-mail"] },

        { name: "Card Title", element: "p", classes: ["card-title"] },
        {
          name: "Card Description",
          element: "p",
          classes: ["card-description"],
        },
        { name: "List Item", element: "li", classes: ["list-item"] },
        {
          name: "List Item No Margin",
          element: "li",
          classes: ["baner-list-item"],
        },
        { name: "Two column list", element: "ul", classes: ["list-column"] },
        {
          name: "List description",
          element: "p",
          classes: ["list-description"],
        },
        {
          name: "banner-sub-title",
          element: "p",
          classes: ["banner-sub-title"],
        },
        {
          name: "banner-description",
          element: "p",
          classes: ["banner-description"],
        },
        {
          name: "banner-link",
          element: "a",
          classes: ["a-banner"],
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: "ul",
          attributes: true,
          classes: true,
          styles: true,
        },
      ],
    },
    placeholder: "Start writing your content here...",
  },
};

export default {
  register() {
    setPluginConfig({
      presets: [modifiedHtmlPreset],
    });
  },
};
