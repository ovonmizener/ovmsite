"use client"

import React, { useState } from 'react'
import { Folder, FileText, Image as ImageIcon, File, Code, Video, Music, Archive, FileX, ChevronRight, ChevronDown, Presentation, Table } from 'lucide-react'
import Image from 'next/image'

interface FileItem {
  id: string
  name: string
  type: 'text' | 'image' | 'code' | 'video' | 'audio' | 'archive' | 'spreadsheet' | 'presentation' | 'pdf' | 'unknown'
  content?: string
  imageSrc?: string
  size?: string
  modified?: string
}

interface FileType {
  id: string
  name: string
  icon: React.ComponentType<any>
  color: string
  files: FileItem[]
}

interface SampleWindowProps {
  onOpenWindow?: (windowId: string) => void
}

const SampleWindow: React.FC<SampleWindowProps> = ({ onOpenWindow }) => {
  const [selectedFileType, setSelectedFileType] = useState<string>('all')
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['all']))

  const fileTypes: FileType[] = [
    {
      id: 'all',
      name: 'All Projects',
      icon: Folder,
      color: 'text-blue-400',
      files: [
        {
          id: 'music-sentiment',
          name: 'Machine Learning - Music Lyric Sentiment Analysis Tool',
          type: 'text',
          content: `# Machine Learning - Music Lyric Sentiment Analysis Tool

## Project Overview
The Music Sentiment Analyzer is a web-based tool designed to analyze and visualize musical trends through sentiment and genre analysis. The project leverages a curated music dataset (up to 2019) as its data source. We preprocess the raw data, perform sentiment and genre analysis using machine learning techniques, and provide interactive visualizations using a dashboard. In addition, the tool includes a front-end application where users can submit lyrics to receive real-time sentiment feedback.

## Features
**Data Processing Pipeline:**
- Extracts key information including the release year directly from the dataset
- Cleans and standardizes raw text data

**Sentiment & Genre Analysis:**
- Uses pre-computed sentiment scores and machine learning models on the lyrics
- Visualizes average sentiment scores by genre, correlations among numeric features, and more

**Interactive Dashboard:**
- Built using Dash and Plotly with multiple tabs: Overview, Numeric Analysis, Thematic Analysis, Track Info, and User Responses
- Integrates real-time user submissions from a separate Flask application

**User Submission Interface:**
- A Flask-based front end allows users to input lyrics
- Inputs are processed, stored in an SQLite database, and reflected on the dashboard, providing dynamic insights

## Tech Stack
**Programming Language:** Python 3.8+

**Libraries & Frameworks:**
- **Data Processing:** Pandas, NumPy
- **Visualization:** Plotly, Dash
- **Machine Learning & NLP:** scikit-learn, TextBlob
- **Web Application:** Flask, Dash
- **Database:** SQLite
- **Styles & Assets:** Custom CSS located in the "assets" folder

## Data Sources
**Primary Dataset:**
- Spotify dataset sourced from Mendeley Data containing song metadata and lyrics (up to 2019)

**Supplementary Data:**
- User-submitted lyrics are stored in a local SQLite database ("submissions_log.db")

## Process & Workflow
**Data Collection & Cleaning:**
- Gather the Spotify dataset and preprocess it using Python
- Convert the release_date column (which contains only the year) to integers
- Remove unwanted characters and standardize the text in the lyrics

**Feature Analysis & Prediction:**
- Implemented a proof-of-concept feature predictor that attempts to predict musical features from lyrics
- Uses TF-IDF vectorization and Random Forest Regression to predict: Danceability, Loudness, Acousticness, Instrumentalness, Valence, Energy
- Note: This is a proof-of-concept implementation with limited accuracy (R² scores around 0.15)

**Baseline Sentiment Analysis (Primary Graded Component):**
- Implemented a robust sentiment analysis model achieving approximately 87% accuracy
- Uses TextBlob for initial sentiment scoring and Logistic Regression for classification
- This is the primary model chosen for grading, demonstrating strong performance in predicting sentiment from lyrics
- The model is trained on a large dataset of song lyrics and their associated sentiment scores, making it particularly effective for musical content

**Visualization & Dashboard Deployment:**
- Pre-compute static figures (e.g., average sentiment by genre; scatter plot for release year vs. sentiment)
- Build an interactive dashboard with multiple tabs
- Integrate a Flask user submission interface to capture additional lyric data dynamically

## GitHub Repository
https://github.com/ovonmizener/project4-databootcamp

## Future Enhancements
- Integrate professional APIs and additional datasets to expand the analysis scope
- Explore advanced deep learning techniques for nuanced sentiment and genre classification
- Improve dashboard interactivity and scalability for real-world applications`,
          size: '4.8 KB',
          modified: '2024-01-15'
        },
        {
          id: 'ipodfiller',
          name: 'ipodfiller App',
          type: 'text',
          content: `# ipodfiller App

## Project Description
A modern desktop app to download and organize music from public Spotify playlists, with full metadata, for use on classic iPods and other devices.

## Features
- Download music from public Spotify playlists
- Full metadata preservation
- Classic iPod compatibility
- Desktop application interface
- Music organization tools

## Technology Stack
- Desktop application framework
- Spotify API integration
- Music file processing
- Metadata management

## GitHub Repository
https://github.com/ovonmizener/ipodfiller

## Status
More information coming soon!`,
          size: '2.8 KB',
          modified: '2024-01-14'
        },
        {
          id: 'python-game',
          name: 'Python Game - Jetpack Escape',
          type: 'text',
          content: `# Python Game - Jetpack Escape

## Project Description
Just for fun, I started making a "Flappy Bird" style game in Python. It's themed after popular streamer Raora, and her character Chattino. I'm just doing this for the experience, I may never finish it, but I wanted a repository available so I can share with friends. Feel free to take/use/modify this however you want.

## Game Features
- Flappy Bird style gameplay
- Themed after streamer Raora and character Chattino
- Python-based implementation
- Open source and modifiable

## How to Play
• SPACE: Jump / Double Jump
• ESC: Return to Menu
• Mouse: Navigate Menus
• Choose between Traditional and Continuous modes

## GitHub Repository
https://github.com/ovonmizener/chattinogame

## Play Game
The game is available to play directly in the browser through the original project window.`,
          size: '2.1 KB',
          modified: '2024-01-13'
        },
        {
          id: 'portfolio',
          name: 'This Website – Portfolio Project',
          type: 'text',
          content: `# This Website – Portfolio Project

## Ethos & Inspiration
This site is a love letter to the **Frutiger Aero** aesthetic—think glassy surfaces, playful gradients, and a sense of digital optimism. I wanted to create a portfolio that felt like a desktop OS from a parallel universe: interactive, fun, and a little nostalgic, but with modern web tech under the hood.

## Tech Stack
- **Next.js** (App Router, SSR, API routes)
- **React** (component-driven UI)
- **Tailwind CSS** (utility-first styling, custom themes)
- **Framer Motion** (animations, drag & drop)
- **TypeScript** (type safety everywhere)
- **Prisma** (future-proofed for backend/data)

## Features
- Draggable, resizable windows (like a real OS)
- Animated taskbar, start orb, and desktop icons
- Vista/Aero glass effects and gradients
- Interactive project windows
- Responsive design with mobile considerations
- Boot animation and welcome screen
- Konami code easter egg

## Design Philosophy
The goal was to create something that feels both nostalgic and modern, combining the playful optimism of Windows Vista's design language with contemporary web development practices. Every interaction should feel smooth and delightful, just like using a well-designed operating system.

## Development Notes
This project showcases my ability to blend different design paradigms and create cohesive, interactive experiences. The Vista aesthetic isn't just visual—it's functional, with windows that behave like real desktop applications.`,
          size: '2.1 KB',
          modified: '2024-01-12'
        },
        {
          id: 'asu-bootcamp',
          name: 'Deep Learning Investment Prediction Tool',
          type: 'text',
          content: `# Deep Learning Investment Prediction Tool

## Overview
The purpose of this project is to create and optimize a deep learning model to predict whether organizations funded by Alphabet Soup will be successful. The model leverages a dataset containing metadata about more than 34,000 organizations to create a binary classifier. In this repository, you will find Jupyter/Colab notebooks with code for data preprocessing, model building, optimization, and evaluation, along with a comprehensive report on our analysis.

## Repository Structure
- **AlphabetSoupCharity.ipynb** – Notebook with the initial model and data preprocessing steps
- **AlphabetSoupCharity_Optimization.ipynb** – Notebook containing advanced feature engineering, model optimization, and evaluation
- **AlphabetSoupCharity_Optimization.h5** – Saved deep learning model
- **training_curves.png** – Image showing the training and validation accuracy curves
- **loss_accuracy_curves.png** – Image showing the loss curves over epochs
- **README.txt** – Document describing the analysis and results

## Report on the Neural Network Model

### Overview of the Analysis
The goal of this analysis is to develop a robust binary classifier that predicts whether an organization will be successful if funded by Alphabet Soup. We approach this by:
- Preprocessing the data to extract useful features
- Engineering and selecting features to reduce noise
- Designing and optimizing a deep neural network
- Comparing the deep learning model with alternative models, such as Gradient Boosting

### Results

#### Data Preprocessing
**Target Variable:**
- **IS_SUCCESSFUL**: Indicates if the organization's funding was used effectively

**Feature Variables:**
- All variables in the dataset except for key identifier columns and the target (e.g., APPLICATION_TYPE, AFFILIATION, CLASSIFICATION, USE_CASE, ORGANIZATION, STATUS, INCOME_AMT, SPECIAL_CONSIDERATIONS, ASK_AMT, etc.)

**Variables Removed:**
- **EIN** and **NAME** were dropped since they serve only as identifiers and offer no predictive value

#### Compiling, Training, and Evaluating the Model

**Network Architecture:**
- **Input Layer**: Matches the number of preprocessed, scaled features after feature selection
- **Hidden Layers**:
  - First hidden layer: 256 neurons with "swish" activation, followed by Batch Normalization and a Dropout of 10%
  - Second hidden layer: 128 neurons with "swish" activation, followed by Batch Normalization and a Dropout of 10%
  - Third hidden layer: 64 neurons with "swish" activation, followed by Batch Normalization
- **Output Layer**: 1 neuron with "sigmoid" activation for binary classification

**Training Details:**
- The model was compiled using the Adam optimizer with a learning rate of 0.0005 and trained with a batch size of 16 for up to 100 epochs
- Callbacks (ReduceLROnPlateau, EarlyStopping, and ModelCheckpoint) were implemented to ensure proper convergence and prevent overfitting

**Target Model Performance:**
- The deep learning model achieved a maximum accuracy of approximately 72%

#### Steps Taken to Improve Performance:
- **Feature Engineering**: Grouping rare categories, one-hot encoding, and feature selection via Random Forest importance
- **Network Optimization**: Adjusting architecture (by increasing neurons and layers), changing activation functions to "swish", using Batch Normalization, and optimizing dropout rates
- **Training Adjustments**: Tuning the learning rate, employing callbacks, and experimenting with epoch count and batch size

**Supporting Images:**
- Curves from learning: Training History

## Summary

### Overall Results
Despite extensive tuning and optimization, our deep learning model plateaued at about 72% accuracy. This suggests that the predictive signal in the provided features may be inherently limited.

### Recommendation for Alternative Models
Given the performance ceiling of our neural network, I recommend exploring tree-based models such as Gradient Boosting (e.g., XGBoost or LightGBM). These models are well-suited for structured, tabular data and often outperform deep learning approaches when the dataset is noisy or has limited features. Preliminary experiments with gradient boosting in our project showed comparable performance, which may be further improved through additional modifications, however this is currently beyond my education on the subject matter.

## Conclusion
This project illustrates a comprehensive approach to solving a real-world classification problem using deep learning. While our optimized neural network could not exceed 72% accuracy, this limitation appears to be due to the dataset characteristics rather than flaws in our method. From my research, alternative techniques like Gradient Boosting are likely to provide better results for this type of problem, and further research could involve merging or ensembling these models for enhanced performance. However for the context of this project, I attempted to improve results ~5 times, and could not break past the 72% barrier.

## Instructions to Run the Project

1. **Clone the Repository:**
   \`\`\`bash
   git clone https://github.com/ovonmizener/deep-learning-challenge
   cd deep-learning-challenge
   \`\`\`

2. **Open Notebooks:**
   - Open AlphabetSoupCharity.ipynb or AlphabetSoupCharity_Optimization.ipynb in Google Colab/VS Code (as hardware allows)

3. **Ensure Dependencies are Installed:**
   - Check the notebook cells for any pip install commands (e.g., !pip install xgboost if using ensemble techniques)

4. **Run the Entire Pipeline:**
   - Execute data preprocessing, model training, and evaluation

## GitHub Repository
https://github.com/ovonmizener/deep-learning-challenge`,
          size: '3.2 KB',
          modified: '2024-01-10'
        },
        {
          id: 'coming-soon',
          name: 'Coming Soon',
          type: 'text',
          content: `# Coming Soon

## Future Projects
More exciting projects are in development and will be added here soon.

## What's Next
Stay tuned for updates on new projects, collaborations, and developments.

## Status
In development`,
          size: '0.8 KB',
          modified: '2024-01-09'
        }
      ]
    },
    {
      id: 'code',
      name: 'Code Projects',
      icon: Code,
      color: 'text-yellow-400',
      files: [
        {
          id: 'python-game',
          name: 'Python Game - Jetpack Escape',
          type: 'text',
          content: `# Python Game - Jetpack Escape

## Project Description
Just for fun, I started making a "Flappy Bird" style game in Python. It's themed after popular streamer Raora, and her character Chattino. I'm just doing this for the experience, I may never finish it, but I wanted a repository available so I can share with friends. Feel free to take/use/modify this however you want.

## Game Features
- Flappy Bird style gameplay
- Themed after streamer Raora and character Chattino
- Python-based implementation
- Open source and modifiable

## How to Play
• SPACE: Jump / Double Jump
• ESC: Return to Menu
• Mouse: Navigate Menus
• Choose between Traditional and Continuous modes

## GitHub Repository
https://github.com/ovonmizener/chattinogame

## Play Game
The game is available to play directly in the browser through the original project window.`,
          size: '2.1 KB',
          modified: '2024-01-13'
        },
        {
          id: 'asu-bootcamp',
          name: 'ASU Data Analytics Boot Camp',
          type: 'text',
          content: `# ASU Data Analytics Boot Camp

## Project Overview
Deep learning challenge project from the ASU Data Analytics Boot Camp. This project focused on advanced data analysis and deep learning techniques.

## GitHub Repository
https://github.com/ovonmizener/deep-learning-challenge

## Status
More details coming soon!`,
          size: '1.5 KB',
          modified: '2024-01-10'
        },
        {
          id: 'coming-soon',
          name: 'Coming Soon',
          type: 'text',
          content: `# Coming Soon

## Future Projects
More exciting projects are in development and will be added here soon.

## What's Next
Stay tuned for updates on new projects, collaborations, and developments.

## Status
In development`,
          size: '0.8 KB',
          modified: '2024-01-09'
        }
      ]
    }
  ]

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const currentFileType = fileTypes.find(ft => ft.id === selectedFileType) || fileTypes[0]
  const currentFiles = currentFileType.files

  const getFileIcon = (file: FileItem) => {
    const iconMap = {
      text: FileText,
      image: ImageIcon,
      code: Code,
      video: Video,
      audio: Music,
      archive: Archive,
      spreadsheet: Table,
      presentation: Presentation,
      pdf: FileX,
      unknown: FileX
    }
    const IconComponent = iconMap[file.type] || FileX
    const color = getFileColor(file)
    return <IconComponent className={`w-4 h-4 ${color}`} />
  }

  const getFileColor = (file: FileItem) => {
    const colorMap = {
      text: 'text-green-400',
      image: 'text-purple-400',
      code: 'text-yellow-400',
      video: 'text-red-400',
      audio: 'text-pink-400',
      archive: 'text-orange-400',
      spreadsheet: 'text-green-500',
      presentation: 'text-orange-400',
      pdf: 'text-red-500',
      unknown: 'text-gray-400'
    }
    return colorMap[file.type] || 'text-gray-400'
  }

  const renderFileContent = (file: FileItem) => {
    switch (file.type) {
      case 'text':
      case 'code':
      case 'spreadsheet':
      case 'presentation':
        // Parse the content and render it in rich format
        const content = file.content || ''
        
        // For project files, render in rich format
        if (file.id === 'music-sentiment') {
          return (
            <div className="space-y-6">
              {/* GitHub Link at the Top */}
              <div className="pb-2 flex justify-center">
                <a 
                  href="https://github.com/ovonmizener/project4-databootcamp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 transition-colors border border-blue-400"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
              </div>
              {/* Project Overview */}
              <div className="bg-white/5 border-l-4 border-blue-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-200">Project Overview</h3>
                <p className="text-white/80 mb-2">The Music Sentiment Analyzer is a web-based tool designed to analyze and visualize musical trends through sentiment and genre analysis. The project leverages a curated music dataset (up to 2019) as its data source. We preprocess the raw data, perform sentiment and genre analysis using machine learning techniques, and provide interactive visualizations using a dashboard. In addition, the tool includes a front-end application where users can submit lyrics to receive real-time sentiment feedback.</p>
              </div>
              {/* Features */}
              <div className="bg-white/5 border-l-4 border-green-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-green-200">Features</h3>
                <div className="space-y-3 text-white/80">
                  <div>
                    <span className="font-medium text-green-200">Data Processing Pipeline:</span>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• Extracts key information including the release year directly from the dataset</li>
                      <li>• Cleans and standardizes raw text data</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-green-200">Sentiment & Genre Analysis:</span>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• Uses pre-computed sentiment scores and machine learning models on the lyrics</li>
                      <li>• Visualizes average sentiment scores by genre, correlations among numeric features, and more</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-green-200">Interactive Dashboard:</span>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• Built using Dash and Plotly with multiple tabs: Overview, Numeric Analysis, Thematic Analysis, Track Info, and User Responses</li>
                      <li>• Integrates real-time user submissions from a separate Flask application</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-green-200">User Submission Interface:</span>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• A Flask-based front end allows users to input lyrics</li>
                      <li>• Inputs are processed, stored in an SQLite database, and reflected on the dashboard, providing dynamic insights</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Tech Stack */}
              <div className="bg-white/5 border-l-4 border-purple-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-purple-200">Tech Stack</h3>
                <div className="space-y-2 text-white/80">
                  <div><span className="font-medium text-purple-200">Programming Language:</span> Python 3.8+</div>
                  <div className="mt-2">
                    <span className="font-medium text-purple-200">Libraries & Frameworks:</span>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• <strong>Data Processing:</strong> Pandas, NumPy</li>
                      <li>• <strong>Visualization:</strong> Plotly, Dash</li>
                      <li>• <strong>Machine Learning & NLP:</strong> scikit-learn, TextBlob</li>
                      <li>• <strong>Web Application:</strong> Flask, Dash</li>
                      <li>• <strong>Database:</strong> SQLite</li>
                      <li>• <strong>Styles & Assets:</strong> Custom CSS located in the "assets" folder</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Data Sources */}
              <div className="bg-white/5 border-l-4 border-cyan-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-cyan-200">Data Sources</h3>
                <div className="space-y-2 text-white/80">
                  <div>
                    <span className="font-medium text-cyan-200">Primary Dataset:</span>
                    <p className="mt-1 ml-4">Spotify dataset sourced from Mendeley Data containing song metadata and lyrics (up to 2019)</p>
                  </div>
                  <div>
                    <span className="font-medium text-cyan-200">Supplementary Data:</span>
                    <p className="mt-1 ml-4">User-submitted lyrics are stored in a local SQLite database ("submissions_log.db")</p>
                  </div>
                </div>
              </div>
              {/* Process & Workflow */}
              <div className="bg-white/5 border-l-4 border-yellow-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-yellow-200">Process & Workflow</h3>
                <div className="space-y-3 text-white/80">
                  <div>
                    <span className="font-medium text-yellow-200">Data Collection & Cleaning:</span>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• Gather the Spotify dataset and preprocess it using Python</li>
                      <li>• Convert the release_date column (which contains only the year) to integers</li>
                      <li>• Remove unwanted characters and standardize the text in the lyrics</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-yellow-200">Feature Analysis & Prediction:</span>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• Implemented a proof-of-concept feature predictor that attempts to predict musical features from lyrics</li>
                      <li>• Uses TF-IDF vectorization and Random Forest Regression to predict: Danceability, Loudness, Acousticness, Instrumentalness, Valence, Energy</li>
                      <li>• Note: This is a proof-of-concept implementation with limited accuracy (R² scores around 0.15)</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-yellow-200">Baseline Sentiment Analysis (Primary Graded Component):</span>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• Implemented a robust sentiment analysis model achieving approximately 87% accuracy</li>
                      <li>• Uses TextBlob for initial sentiment scoring and Logistic Regression for classification</li>
                      <li>• This is the primary model chosen for grading, demonstrating strong performance in predicting sentiment from lyrics</li>
                      <li>• The model is trained on a large dataset of song lyrics and their associated sentiment scores, making it particularly effective for musical content</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-yellow-200">Visualization & Dashboard Deployment:</span>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• Pre-compute static figures (e.g., average sentiment by genre; scatter plot for release year vs. sentiment)</li>
                      <li>• Build an interactive dashboard with multiple tabs</li>
                      <li>• Integrate a Flask user submission interface to capture additional lyric data dynamically</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Future Enhancements */}
              <div className="bg-white/5 border-l-4 border-orange-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-orange-200">Future Enhancements</h3>
                <ul className="text-white/80 space-y-1">
                  <li>• Integrate professional APIs and additional datasets to expand the analysis scope</li>
                  <li>• Explore advanced deep learning techniques for nuanced sentiment and genre classification</li>
                  <li>• Improve dashboard interactivity and scalability for real-world applications</li>
                </ul>
              </div>
            </div>
          )
        }
        
        if (file.id === 'ipodfiller') {
          return (
            <div className="space-y-6">
              {/* GitHub Link */}
              <div className="pb-2 flex justify-center">
                <a 
                  href="https://github.com/ovonmizener/ipodfiller" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 transition-colors border border-blue-400"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
              </div>
              {/* Project Description */}
              <div className="bg-white/5 border-l-4 border-purple-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-purple-200">Project Description</h3>
                <p className="text-white/80 mb-4">A modern desktop app to download and organize music from public Spotify playlists, with full metadata, for use on classic iPods and other devices.</p>
              </div>
              {/* Screenshot */}
              <div className="bg-white/5 border-l-4 border-cyan-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-cyan-200">Screenshot</h3>
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/images/ipodfiller-screenshot.png"
                    alt="ipodfiller App Screenshot"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              {/* Features */}
              <div className="bg-white/5 border-l-4 border-green-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-green-200">Features</h3>
                <ul className="text-white/80 space-y-1">
                  <li>• Download tracks from any public Spotify playlist</li>
                  <li>• Automatic metadata embedding (title, artist, album, artwork)</li>
                  <li>• Progress tracking and error handling</li>
                  <li>• Standalone executable distribution (no Python required for end users)</li>
                  <li>• In-app instructions and settings for Spotify API keys</li>
                  <li>• Classic iPod compatibility with full metadata preservation</li>
                </ul>
              </div>
              {/* Technology Stack */}
              <div className="bg-white/5 border-l-4 border-blue-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-200">Technology Stack</h3>
                <ul className="text-white/80 space-y-1">
                  <li>• <strong>Python 3.8+</strong> (core application)</li>
                  <li>• <strong>CustomTkinter</strong> (GUI framework with Frutiger Aero styling)</li>
                  <li>• <strong>Spotify Web API</strong> (playlist and track data)</li>
                  <li>• <strong>FFmpeg</strong> (audio processing and conversion)</li>
                  <li>• <strong>PyInstaller</strong> (standalone executable creation)</li>
                  <li>• <strong>Metadata libraries</strong> (ID3 tags, album artwork)</li>
                </ul>
              </div>
              {/* Development & Usage */}
              <div className="bg-white/5 border-l-4 border-yellow-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-yellow-200">Development & Usage</h3>
                <div className="space-y-3 text-white/80">
                  <div>
                    <span className="font-medium text-yellow-200">For Developers:</span>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• Clone repository and install dependencies with <code className="bg-white/10 px-1 rounded">pip install -r requirements.txt</code></li>
                      <li>• Download FFmpeg and place <code className="bg-white/10 px-1 rounded">ffmpeg.exe</code> in project folder</li>
                      <li>• Run with <code className="bg-white/10 px-1 rounded">python main.py</code></li>
                      <li>• Build executable with <code className="bg-white/10 px-1 rounded">pyinstaller --onefile --windowed --add-binary "ffmpeg.exe;." main.py</code></li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-yellow-200">For End Users:</span>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• Standalone executable (no Python installation required)</li>
                      <li>• Enter Spotify API credentials in app settings</li>
                      <li>• Paste public Spotify playlist URL</li>
                      <li>• Choose download directory and start download</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Important Notes */}
              <div className="bg-white/5 border-l-4 border-orange-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-orange-200">Important Notes</h3>
                <ul className="text-white/80 space-y-1">
                  <li>• Only public Spotify playlists are supported</li>
                  <li>• You must use your own Spotify API credentials (get them at developer.spotify.com)</li>
                  <li>• Downloaded files are MP3s with full metadata</li>
                  <li>• Compiled .exe is NOT included in the repository</li>
                  <li>• MIT License</li>
                </ul>
              </div>
              {/* Disclaimer */}
              <div className="bg-white/5 border-l-4 border-red-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-red-200">Disclaimer</h3>
                <p className="text-white/80 mb-2">This application is provided solely for personal use and for obtaining music that you have the legal rights to access. I do not condone, support, or promote music piracy in any form. The purpose of this tool is to help manage and organize music that you already own or have explicit permission to use.</p>
                <p className="text-white/80">By using this application, you agree that it is your responsibility to comply with all applicable copyright laws and licensing agreements. Use it responsibly and ensure that you only download content for which you hold the necessary rights.</p>
              </div>
            </div>
          )
        }
        
        if (file.id === 'python-game') {
          return (
            <div className="space-y-6">
              {/* GitHub Link and Play Game Button */}
              <div className="pb-2 flex justify-center space-x-4">
                <a 
                  href="https://github.com/ovonmizener/chattinogame" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 transition-colors border border-blue-400"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
                {onOpenWindow && (
                  <button 
                    onClick={() => onOpenWindow("flappy-bird-game")}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-colors border border-green-500/30"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    🎮 Play Game
                  </button>
                )}
              </div>
              {/* Project Description */}
              <div className="bg-white/5 border-l-4 border-purple-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-purple-200">Project Description</h3>
                <p className="text-white/80 mb-4">Just for fun, I started making a "Flappy Bird" style game in Python. It's themed after popular streamer Raora, and her character Chattino. I'm just doing this for the experience, I may never finish it, but I wanted a repository available so I can share with friends. Feel free to take/use/modify this however you want.</p>
              </div>
              {/* Game Features */}
              <div className="bg-white/5 border-l-4 border-green-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-green-200">Game Features</h3>
                <ul className="text-white/80 space-y-1">
                  <li>• Flappy Bird style gameplay</li>
                  <li>• Themed after streamer Raora and character Chattino</li>
                  <li>• Python-based implementation</li>
                  <li>• Open source and modifiable</li>
                </ul>
              </div>
              {/* How to Play */}
              <div className="bg-white/5 border-l-4 border-blue-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-200">How to Play</h3>
                <ul className="text-white/80 space-y-1">
                  <li>• SPACE: Jump / Double Jump</li>
                  <li>• ESC: Return to Menu</li>
                  <li>• Mouse: Navigate Menus</li>
                  <li>• Choose between Traditional and Continuous modes</li>
                </ul>
              </div>
            </div>
          )
        }
        
        if (file.id === 'portfolio') {
          return (
            <div className="space-y-6">
              {/* GitHub Link */}
              <div className="pb-2 flex justify-center">
                <a 
                  href="https://github.com/ovonmizener/ovmsite" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 transition-colors border border-blue-400"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
              </div>
              {/* Ethos & Inspiration */}
              <div className="bg-white/5 border-l-4 border-purple-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-purple-200">Ethos & Inspiration</h3>
                <p className="text-white/80 mb-4">This site is a love letter to the <strong>Frutiger Aero</strong> aesthetic—think glassy surfaces, playful gradients, and a sense of digital optimism. I wanted to create a portfolio that felt like a desktop OS from a parallel universe: interactive, fun, and a little nostalgic, but with modern web tech under the hood.</p>
              </div>
              {/* Tech Stack */}
              <div className="bg-white/5 border-l-4 border-blue-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-200">Tech Stack</h3>
                <ul className="text-white/80 space-y-1">
                  <li>• <strong>Next.js</strong> (App Router, SSR, API routes)</li>
                  <li>• <strong>React</strong> (component-driven UI)</li>
                  <li>• <strong>Tailwind CSS</strong> (utility-first styling, custom themes)</li>
                  <li>• <strong>Framer Motion</strong> (animations, drag & drop)</li>
                  <li>• <strong>TypeScript</strong> (type safety everywhere)</li>
                  <li>• <strong>Prisma</strong> (future-proofed for backend/data)</li>
                </ul>
              </div>
              {/* Features */}
              <div className="bg-white/5 border-l-4 border-green-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-green-200">Features</h3>
                <ul className="text-white/80 space-y-1">
                  <li>• Draggable, resizable windows (like a real OS)</li>
                  <li>• Animated taskbar, start orb, and desktop icons</li>
                  <li>• Vista/Aero glass effects and gradients</li>
                  <li>• Interactive project windows</li>
                  <li>• Responsive design with mobile considerations</li>
                  <li>• Boot animation and welcome screen</li>
                  <li>• Konami code easter egg</li>
                </ul>
              </div>
              {/* Design Philosophy */}
              <div className="bg-white/5 border-l-4 border-yellow-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-yellow-200">Design Philosophy</h3>
                <p className="text-white/80">The goal was to create something that feels both nostalgic and modern, combining the playful optimism of Windows Vista's design language with contemporary web development practices. Every interaction should feel smooth and delightful, just like using a well-designed operating system.</p>
              </div>
              {/* Development Notes */}
              <div className="bg-white/5 border-l-4 border-red-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-red-200">Development Notes</h3>
                <p className="text-white/80">This project showcases my ability to blend different design paradigms and create cohesive, interactive experiences. The Vista aesthetic isn't just visual—it's functional, with windows that behave like real desktop applications.</p>
              </div>
            </div>
          )
        }
        
        if (file.id === 'asu-bootcamp') {
          return (
            <div className="space-y-6">
              {/* GitHub Link */}
              <div className="pb-2 flex justify-center">
                <a 
                  href="https://github.com/ovonmizener/deep-learning-challenge" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 transition-colors border border-blue-400"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
              </div>
              {/* Overview */}
              <div className="bg-white/5 border-l-4 border-blue-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-200">Overview</h3>
                <p className="text-white/80 mb-2">The purpose of this project is to create and optimize a deep learning model to predict whether organizations funded by Alphabet Soup will be successful. The model leverages a dataset containing metadata about more than 34,000 organizations to create a binary classifier. In this repository, you will find Jupyter/Colab notebooks with code for data preprocessing, model building, optimization, and evaluation, along with a comprehensive report on our analysis.</p>
              </div>
              {/* Repository Structure */}
              <div className="bg-white/5 border-l-4 border-green-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-green-200">Repository Structure</h3>
                <ul className="text-white/80 space-y-1">
                  <li>• <strong>AlphabetSoupCharity.ipynb</strong> – Notebook with the initial model and data preprocessing steps</li>
                  <li>• <strong>AlphabetSoupCharity_Optimization.ipynb</strong> – Notebook containing advanced feature engineering, model optimization, and evaluation</li>
                  <li>• <strong>AlphabetSoupCharity_Optimization.h5</strong> – Saved deep learning model</li>
                  <li>• <strong>training_curves.png</strong> – Image showing the training and validation accuracy curves</li>
                  <li>• <strong>loss_accuracy_curves.png</strong> – Image showing the loss curves over epochs</li>
                  <li>• <strong>README.txt</strong> – Document describing the analysis and results</li>
                </ul>
              </div>
              {/* Network Architecture */}
              <div className="bg-white/5 border-l-4 border-purple-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-purple-200">Network Architecture</h3>
                <div className="space-y-2 text-white/80">
                  <div><span className="font-medium text-purple-200">Input Layer:</span> Matches the number of preprocessed, scaled features after feature selection</div>
                  <div className="mt-2">
                    <span className="font-medium text-purple-200">Hidden Layers:</span>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• First hidden layer: 256 neurons with "swish" activation, followed by Batch Normalization and a Dropout of 10%</li>
                      <li>• Second hidden layer: 128 neurons with "swish" activation, followed by Batch Normalization and a Dropout of 10%</li>
                      <li>• Third hidden layer: 64 neurons with "swish" activation, followed by Batch Normalization</li>
                    </ul>
                  </div>
                  <div><span className="font-medium text-purple-200">Output Layer:</span> 1 neuron with "sigmoid" activation for binary classification</div>
                </div>
              </div>
              {/* Training Details */}
              <div className="bg-white/5 border-l-4 border-cyan-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-cyan-200">Training Details</h3>
                <ul className="text-white/80 space-y-1">
                  <li>• The model was compiled using the Adam optimizer with a learning rate of 0.0005</li>
                  <li>• Trained with a batch size of 16 for up to 100 epochs</li>
                  <li>• Callbacks (ReduceLROnPlateau, EarlyStopping, and ModelCheckpoint) were implemented to ensure proper convergence and prevent overfitting</li>
                  <li>• <strong>Target Model Performance:</strong> The deep learning model achieved a maximum accuracy of approximately 72%</li>
                </ul>
              </div>
              {/* Data Preprocessing */}
              <div className="bg-white/5 border-l-4 border-yellow-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-yellow-200">Data Preprocessing</h3>
                <div className="space-y-3 text-white/80">
                  <div>
                    <span className="font-medium text-yellow-200">Target Variable:</span>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• <strong>IS_SUCCESSFUL:</strong> Indicates if the organization's funding was used effectively</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-yellow-200">Feature Variables:</span>
                    <p className="mt-1 ml-4">All variables in the dataset except for key identifier columns and the target (e.g., APPLICATION_TYPE, AFFILIATION, CLASSIFICATION, USE_CASE, ORGANIZATION, STATUS, INCOME_AMT, SPECIAL_CONSIDERATIONS, ASK_AMT, etc.)</p>
                  </div>
                  <div>
                    <span className="font-medium text-yellow-200">Variables Removed:</span>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• <strong>EIN</strong> and <strong>NAME</strong> were dropped since they serve only as identifiers and offer no predictive value</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Performance Optimization */}
              <div className="bg-white/5 border-l-4 border-orange-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-orange-200">Steps Taken to Improve Performance</h3>
                <ul className="text-white/80 space-y-1">
                  <li>• <strong>Feature Engineering:</strong> Grouping rare categories, one-hot encoding, and feature selection via Random Forest importance</li>
                  <li>• <strong>Network Optimization:</strong> Adjusting architecture (by increasing neurons and layers), changing activation functions to "swish", using Batch Normalization, and optimizing dropout rates</li>
                  <li>• <strong>Training Adjustments:</strong> Tuning the learning rate, employing callbacks, and experimenting with epoch count and batch size</li>
                </ul>
              </div>
              {/* Results & Recommendations */}
              <div className="bg-white/5 border-l-4 border-red-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-red-200">Results & Recommendations</h3>
                <div className="space-y-3 text-white/80">
                  <div>
                    <span className="font-medium text-red-200">Overall Results:</span>
                    <p className="mt-1 ml-4">Despite extensive tuning and optimization, our deep learning model plateaued at about 72% accuracy. This suggests that the predictive signal in the provided features may be inherently limited.</p>
                  </div>
                  <div>
                    <span className="font-medium text-red-200">Recommendation for Alternative Models:</span>
                    <p className="mt-1 ml-4">Given the performance ceiling of our neural network, I recommend exploring tree-based models such as Gradient Boosting (e.g., XGBoost or LightGBM). These models are well-suited for structured, tabular data and often outperform deep learning approaches when the dataset is noisy or has limited features.</p>
                  </div>
                </div>
              </div>
              {/* Instructions */}
              <div className="bg-white/5 border-l-4 border-indigo-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-indigo-200">Instructions to Run the Project</h3>
                <div className="space-y-2 text-white/80">
                  <div>
                    <span className="font-medium text-indigo-200">1. Clone the Repository:</span>
                    <div className="mt-1 ml-4 bg-white/10 p-2 rounded font-mono text-sm">
                      git clone https://github.com/ovonmizener/deep-learning-challenge<br/>
                      cd deep-learning-challenge
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-indigo-200">2. Open Notebooks:</span>
                    <p className="mt-1 ml-4">Open AlphabetSoupCharity.ipynb or AlphabetSoupCharity_Optimization.ipynb in Google Colab/VS Code (as hardware allows)</p>
                  </div>
                  <div>
                    <span className="font-medium text-indigo-200">3. Ensure Dependencies are Installed:</span>
                    <p className="mt-1 ml-4">Check the notebook cells for any pip install commands (e.g., !pip install xgboost if using ensemble techniques)</p>
                  </div>
                  <div>
                    <span className="font-medium text-indigo-200">4. Run the Entire Pipeline:</span>
                    <p className="mt-1 ml-4">Execute data preprocessing, model training, and evaluation</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        
        // Default fallback for other text files
        return (
          <div className="bg-white/5 rounded-lg p-6 shadow-sm border border-white/10">
            <div className="prose prose-invert prose-sm max-w-none text-white/90">
              <div className="whitespace-pre-wrap font-sans leading-relaxed">
                {content}
              </div>
            </div>
          </div>
        )
        
      case 'image':
        return (
          <div className="bg-white/5 rounded-lg p-4 shadow-sm border border-white/10 flex items-center justify-center">
            {file.imageSrc ? (
              <div className="relative w-full h-full max-h-96">
                <Image
                  src={file.imageSrc}
                  alt={file.name}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="text-white/60">Image not available</div>
            )}
          </div>
        )
      default:
        return (
          <div className="bg-white/5 rounded-lg p-4 shadow-sm border border-white/10 flex items-center justify-center">
            <div className="text-white/60">Preview not available for this file type</div>
          </div>
        )
    }
  }

  return (
    <div className="w-full h-full flex bg-white/10 backdrop-blur-sm text-white/90 overflow-hidden aero-glass">
      {/* Sidebar */}
      <div className="w-64 bg-white/5 border-r border-white/20 flex flex-col">
        <div className="p-4 border-b border-white/20">
          <h3 className="text-white font-semibold text-lg vista-text-glow">Project Files</h3>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {fileTypes.map((fileType) => (
            <div key={fileType.id}>
              <button
                onClick={() => toggleFolder(fileType.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/8 transition-all duration-200 ${
                  selectedFileType === fileType.id ? 'bg-white/12 border-r-2 border-blue-400/60 shadow-sm' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <fileType.icon className={`w-4 h-4 ${fileType.color}`} />
                  <span className="text-white/90 text-sm font-medium">{fileType.name}</span>
                </div>
                {expandedFolders.has(fileType.id) ? (
                  <ChevronDown className="w-4 h-4 text-white/70 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-white/70 transition-transform duration-200" />
                )}
              </button>
              {expandedFolders.has(fileType.id) && (
                <div className="ml-6 border-l border-white/10">
                  {fileType.files.map((file) => (
                    <button
                      key={file.id}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-white/6 transition-all duration-200 ${
                        selectedFile?.id === file.id ? 'bg-white/10 border-r border-blue-300/40 shadow-sm' : ''
                      }`}
                    >
                      {getFileIcon(file)}
                      <span className="text-white/75 text-xs truncate">{file.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedFile ? (
          <>
            {/* File Header */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center space-x-2">
                {getFileIcon(selectedFile)}
                <div>
                  <h3 className="text-white font-semibold text-lg">{selectedFile.name}</h3>
                  <div className="flex items-center space-x-4 text-xs text-white/60">
                    <span>{selectedFile.size}</span>
                    <span>{selectedFile.modified}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* File Content */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              <div className="prose prose-invert prose-sm max-w-none">
                {renderFileContent(selectedFile)}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/60">
            <div className="text-center">
              <File className="w-12 h-12 mx-auto mb-2 text-white/30" />
              <p>Select a file to view its content</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleWindow 