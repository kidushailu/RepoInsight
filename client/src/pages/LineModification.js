import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./LineModification.css";

const mockLines = [
    { id: 1, time: "4 months ago", message: "renamed models folder to pages", code: `import 'package:art_showcase/firebase_options.dart';` },
    { id: 2, time: "4 months ago", message: "Integrated firebase. Setting up firebase", code: `import 'package:firebase_core/firebase_core.dart';` },
    { id: 3, time: "4 months ago", message: "Initial commit", code: `import 'package:flutter/material.dart';` },
    { id: 4, time: "4 months ago", message: "Initial outline of app. Created all folders", code: `import 'package:provider/provider.dart';` },
    { id: 5, time: "4 months ago", message: "Initial commit", code: `import 'splash_screen.dart';` },
    { id: 6, time: "4 months ago", message: "Initial commit", code: `` },
    { id: 7, time: "4 months ago", message: "Integrated firebase. Setting up firebase", code: `void main() async {` },
    { id: 8, time: "4 months ago", message: "Integrated firebase. Setting up firebase", code: `WidgetsFlutterBinding.ensureInitialized();` },
    { id: 9, time: "4 months ago", message: "renamed models folder to pages", code: `  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);` },
    { id: 10, time: "4 months ago", message: "Integrated firebase. Setting up firebase", code: `` },
    { id: 11, time: "4 months ago", message: "Initial outline of app. Created all folders", code: `runApp(` },
    { id: 12, time: "4 months ago", message: "Initial outline of app. Created all folders", code: `ChangeNotifierProvider(` },
    { id: 13, time: "4 months ago", message: "Initial outline of app. Created all folders", code: `create: (_) => ThemeProvider(),` },
    { id: 14, time: "4 months ago", message: "minor updates", code: `child: const ArtConnectApp(),` },
    { id: 15, time: "4 months ago", message: "Initial outline of app. Created all folders", code: ` ),` },
    { id: 16, time: "4 months ago", message: "Initial outline of app. Created all folders", code: ` );` },
    { id: 17, time: "4 months ago", message: "Initial commit", code: `}` },
    { id: 18, time: "4 months ago", message: "", code: `` },
    { id: 19, time: "4 months ago", message: "Initial outline of app. Created all folders", code: `class ArtConnectApp extends StatelessWidget {` },
    { id: 20, time: "4 months ago", message: "minor updates", code: `  const ArtConnectApp({super.key});` },
    { id: 21, time: "4 months ago", message: "Initial commit", code: `` },
    { id: 22, time: "4 months ago", message: "Initial commit", code: `@override` },
    { id: 23, time: "4 months ago", message: "Initial commit", code: `Widget build(BuildContext context) {` },
    { id: 24, time: "4 months ago", message: "Initial outline of app. Created all folders", code: `final themeProvider = Provider.of<ThemeProvider>(context);` },
    { id: 25, time: "4 months ago", message: "Initial commit", code: `` },
    { id: 26, time: "4 months ago", message: "Initial outline of app. Created all folders", code: `return MaterialApp(` },
    { id: 27, time: "4 months ago", message: "Initial outline of app. Created all folders", code: `theme: themeProvider.getTheme(),` },
    { id: 28, time: "4 months ago", message: "Initial outline of app. Created all folders", code: `home: SplashScreen(),` },
    { id: 29, time: "4 months ago", message: "Initial commit", code: `);` },
  ];

function LineModification() {
  const navigate = useNavigate();

  return (
    <div className="container-line-modification">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiArrowLeft size={20} />
        </button>
        <h3>FileName</h3>
      </div>
      <div className="code-list">
        {mockLines.map((line) => (
          <div className="code-line" key={line.id}>
            <div className="meta">
              <img src="https://avatars.githubusercontent.com/u/9919?s=40&v=4" alt="avatar" />
              <div>
                <div className="message">{line.message}</div>
                <div className="time">{line.time}</div>
              </div>
            </div>
            <div className="code-block">
              <span className="line-number">{line.id}</span>
              <span className="code">{line.code}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LineModification;
