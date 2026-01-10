Release Notes

This release of Phi-4-multimodal-instruct is based on valuable user feedback from the Phi-3 series. Previously, users could use a speech recognition model to talk to the Mini and Vision models. To achieve this, users needed to use a pipeline of two models: one model to transcribe the audio to text, and another model for the language or vision tasks. This pipeline means that the core model was not provided the full breadth of input information – e.g. cannot directly observe multiple speakers, background noises, jointly align speech, vision, language information at the same time on the same representation space.

With Phi-4-multimodal-instruct, a single new open model has been trained across text, vision, and audio, meaning that all inputs and outputs are processed by the same neural network. The model employed new architecture, larger vocabulary for efficiency, multilingual, and multimodal support, and better post-training techniques were used for instruction following and function calling, as well as additional data leading to substantial gains on key multimodal capabilities.

It is anticipated that Phi-4-multimodal-instruct will greatly benefit app developers and various use cases. The enthusiastic support for the Phi-4 series is greatly appreciated. Feedback on Phi-4-multimodal-instruct is welcomed and crucial to the model’s evolution and improvement. Thank you for being part of this journey!
Primary use cases

The model is intended for broad multilingual and multimodal commercial and research use. The model provides uses for general purpose AI systems and applications which require:

    Memory/compute constrained environments
    Latency bound scenarios
    Strong reasoning (especially math and logic)
    Function and tool calling
    General image understanding
    Optical character recognition
    Chart and table understanding
    Multiple image comparison
    Multi-image or video clip summarization
    Speech recognition
    Speech translation
    Speech QA
    Speech summarization
    Audio understanding

The model is designed to accelerate research on language and multimodal models, for use as a building block for generative AI powered features.
Out-of-scope use cases

The model is not specifically designed or evaluated for all downstream purposes. Developers should consider common limitations of language models and multimodal models, as well as performance difference across languages, as they select use cases, and evaluate and mitigate for accuracy, safety, and fairness before using within a specific downstream use case, particularly for high-risk scenarios. Developers should be aware of and adhere to applicable laws or regulations (including but not limited to privacy, trade compliance laws, etc.) that are relevant to their use case.

Nothing contained in this Model Card should be interpreted as or deemed a restriction or modification to the license the model is released under.
Data Overview

Phi-4-multimodal-instruct’s training data includes a wide variety of sources, totaling 5 trillion text tokens, and is a combination of:

    Publicly available documents filtered for quality, selected high-quality educational data, and code
    Newly created synthetic, “textbook-like” data for the purpose of teaching math, coding, common sense reasoning, general knowledge of the world (e.g., science, daily activities, theory of mind, etc.)
    High quality human labeled data in chat format
    Selected high-quality image-text interleave data
    Synthetic and publicly available image, multi-image, and video data
    Anonymized in-house speech-text pair data with strong/weak transcriptions
    Selected high-quality publicly available and anonymized in-house speech data with task-specific supervisions
    Selected synthetic speech data
    Synthetic vision-speech data

Focus was placed on the quality of data that could potentially improve the reasoning ability for the model, and the publicly available documents were filtered to contain a preferred level of knowledge. As an example, the result of a game in premier league on a particular day might be good training data for large foundation models, but such information was removed for the Phi-4-multimodal-instruct to leave more model capacity for reasoning for the model’s small size. The data collection process involved sourcing information from publicly available documents, with a focus on filtering out undesirable documents and images. To safeguard privacy, image and text data sources were filtered to remove or scrub potentially personal data from the training data.

The decontamination process involved normalizing and tokenizing the dataset, then generating and comparing n-grams between the target dataset and benchmark datasets. Samples with matching n-grams above a threshold were flagged as contaminated and removed from the dataset. A detailed contamination report was generated, summarizing the matched text, matching ratio, and filtered results for further analysis.
Model Summary
	Description
Developers 	Microsoft
Description 	Phi-4-multimodal-instruct is a lightweight open multimodal foundation model that leverages the language, vision, and speech research and datasets used for Phi-3.5 and 4.0 models. The model processes text, image, and audio inputs, generating text outputs, and comes with 128K token context length. The model underwent an enhancement process, incorporating both supervised fine-tuning, and direct preference optimization to support precise instruction adherence and safety measures.
Architecture 	Phi-4-multimodal-instruct has 5.6B parameters and is a multimodal transformer model. The model has the pretrained Phi-4-mini as the backbone language model, and the advanced encoders and adapters of vision and speech.
Inputs 	Text, image, and audio. It is best suited for prompts using the chat format.
Context length 	128K tokens
GPUs 	512 A100-80G
Training time 	28 days
Training data 	5T text tokens, 2.3M speech hours, and 1.1T image-text tokens
Outputs 	Generated text in response to the input
Dates 	Trained between December 2024 and January 2025
Status 	This is a static model trained on offline datasets with the cutoff date of June 2024 for publicly available data.
Languages in training data 	Arabic, Chinese, Czech, Danish, Dutch, English, Finnish, French, German, Hebrew, Hungarian, Italian, Japanese, Korean, Norwegian, Polish, Portuguese, Russian, Spanish, Swedish, Thai, Turkish, Ukrainian
Note that these are for TEXT only. There is limited language support for IMAGE and AUDIO modalities.
Vision: English
Audio: English, Chinese, German, French, Italian, Japanese, Spanish, Portuguese
Release date 	February, 2025
Responsible AI Considerations

Like other language models, the Phi family of models can potentially behave in ways that are unfair, unreliable, or offensive. Some of the limiting behaviors to be aware of include:
Quality of Service

The Phi models are trained primarily on English language content across text, speech, and visual inputs, with some additional multilingual coverage. Performance may vary significantly across different modalities and languages:

    Text: Languages other than English will experience reduced performance, with varying levels of degradation across different non-English languages. English language varieties with less representation in the training data may perform worse than standard American English.
    Speech: Speech recognition and processing shows similar language-based performance patterns, with optimal performance for standard American English accents and pronunciations. Other English accents, dialects, and non-English languages may experience lower recognition accuracy and response quality. Background noise, audio quality, and speaking speed can further impact performance.
    Vision: Visual processing capabilities may be influenced by cultural and geographical biases in the training data. The model may show reduced performance when analyzing images containing text in non-English languages or visual elements more commonly found in non-Western contexts. Image quality, lighting conditions, and composition can also affect processing accuracy.

Multilingual Performance and Safety Gaps

We believe it is important to make language models more widely available across different languages, but the Phi 4 models still exhibit challenges common across multilingual releases. As with any deployment of LLMs, developers will be better positioned to test for performance or safety gaps for their linguistic and cultural context and customize the model with additional fine-tuning and appropriate safeguards.
Representation of Harms & Perpetuation of Stereotypes

These models can over- or under-represent groups of people, erase representation of some groups, or reinforce demeaning or negative stereotypes. Despite safety post-training, these limitations may still be present due to differing levels of representation of different groups, cultural contexts, or prevalence of examples of negative stereotypes in training data that reflect real-world patterns and societal biases.
Inappropriate or Offensive Content

These models may produce other types of inappropriate or offensive content, which may make it inappropriate to deploy for sensitive contexts without additional mitigations that are specific to the case.
Information Reliability

Language models can generate nonsensical content or fabricate content that might sound reasonable but is inaccurate or outdated.
Limited Scope for Code

The majority of Phi 4 training data is based in Python and uses common packages such as typing, math, random, collections, datetime, itertools. If the model generates Python scripts that utilize other packages or scripts in other languages, it is strongly recommended that users manually verify all API uses.
Long Conversation

Phi 4 models, like other models, can in some cases generate responses that are repetitive, unhelpful, or inconsistent in very long chat sessions in both English and non-English languages. Developers are encouraged to place appropriate mitigations, like limiting conversation turns to account for the possible conversational drift.
Inference of Sensitive Attributes

The Phi 4 models can sometimes attempt to infer sensitive attributes (such as personality characteristics, country of origin, gender, etc.) from the users’ voices when specifically asked to do so. Phi 4-multimodal-instruct is not designed or intended to be used as a biometric categorization system to categorize individuals based on their biometric data to deduce or infer their race, political opinions, trade union membership, religious or philosophical beliefs, sex life, or sexual orientation. This behavior can be easily and efficiently mitigated at the application level by a system message.
Responsible AI Best Practices

Developers should apply responsible AI best practices, including mapping, measuring, and mitigating risks associated with their specific use case and cultural, linguistic context. Phi 4 family of models are general purpose models. As developers plan to deploy these models for specific use cases, they are encouraged to fine-tune the models for their use case and leverage the models as part of broader AI systems with language-specific safeguards in place. Important areas for consideration include:

    Allocation: Models may not be suitable for scenarios that could have consequential impact on legal status or the allocation of resources or life opportunities (e.g., housing, employment, credit, etc.) without further assessments and additional debiasing techniques.
    High-Risk Scenarios: Developers should assess the suitability of using models in high-risk scenarios where unfair, unreliable or offensive outputs might be extremely costly or lead to harm. This includes providing advice in sensitive or expert domains where accuracy and reliability are critical (e.g., legal or health advice). Additional safeguards should be implemented at the application level according to the deployment context.
    Misinformation: Models may produce inaccurate information. Developers should follow transparency best practices and inform end-users they are interacting with an AI system. At the application level, developers can build feedback mechanisms and pipelines to ground responses in use-case specific, contextual information, a technique known as Retrieval Augmented Generation (RAG).
    Generation of Harmful Content: Developers should assess outputs for their context and use available safety classifiers or custom solutions appropriate for their use case.
    Misuse: Other forms of misuse such as fraud, spam, or malware production may be possible, and developers should ensure that their applications do not violate applicable laws and regulations. |
