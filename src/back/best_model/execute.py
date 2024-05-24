import torch
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification

def load_model_and_tokenizer(model_directory):
    tokenizer = AutoTokenizer.from_pretrained(model_directory)
    model = AutoModelForSequenceClassification.from_pretrained(model_directory, use_safetensors=True)
    return model, tokenizer

def prepare_inputs(texts, tokenizer):
    inputs = tokenizer(
        texts,
        padding=True,
        truncation=True,
        return_tensors="pt",
        max_length=512
    )
    return inputs

def predict_labels(texts, model, tokenizer):
    inputs = prepare_inputs(texts, tokenizer)
    input_ids = inputs['input_ids']
    attention_mask = inputs['attention_mask']
    
    model.eval()
    with torch.no_grad():
        outputs = model(input_ids, attention_mask=attention_mask)
        logits = outputs.logits
        sigmoid = torch.nn.Sigmoid()
        probs = sigmoid(logits.squeeze().cpu())
        predictions = np.zeros(probs.shape)
        predictions[np.where(probs >= 0.5)] = 1
        print(predictions)
    return predictions


def resp(label):
    if label == 1:
        return 'Yes'
    return 'No' 

def main():
    model_directory = 'C:/Users/solomia/Desktop/Дипломна. Результати/ui/web-app/src/back/best_model'
    model, tokenizer = load_model_and_tokenizer(model_directory)
    
    texts = [
        "Yesterday I visited my grandmother. She is feeling great and we spent the whole day watching her favorite movies. We cooked dinner together and I was happy to spend time with her", ### very positive example 
        "I want to die", ### most people during the period of depression
        "There's no divine justice, you dumb cunt. If there was, you'd be dead and that girl would be alive", ### Sandor Clegane, also known as 'The Hound' 
        "Some people play the game, some people love the game — but I think I live the game.", ### Paige Bueckers
        "I just wanna graduate", ### Me
        "Girl, there ain't no I in 'team', But you know there is a 'me', Strike the band up, one, two, three, I promise that you'll never find another like me", ### Taylor Swift - ME,
        "I stand in California with my toes in the sand, Use the sleeves of my sweater, Let's have an adventure, Head in the clouds but my gravity centered", ### The Neighbourhood 
        "I can't sleep anymore, I'm too tired to do anything, but unfortunately I can't fall asleep, I'm a walking zombie. No amount of coffee helps.", ### also Me, (during writing the dyploma papers)
        "I don't pray aymore. It's the only place I can go and people don't talk to me", ### Sansa Stark
        "You will be running all your life. Terrible things happen to your family and you will weep. Stop being a bystander, stop runnning, avenge them.", ### Petyr Baelish
        "'And who are you?' The proud Lord said, 'That I must bow so low', Only a cat of a different coat, That's all the truth I know", ### Rains of Castamere,
        "I went on an awesome 1st date with a really cute guy. It was fun. He was super, smart, attractive, CHIVALROUS even... We're going on a second date soon. The problem is I have no idea if this is working or not." ### someone who definetly enjoys their time
    ];

    predictions = predict_labels(texts, model, tokenizer)


    for text, label in zip(texts, predictions):
        print(f"Text: {text}\nIs stressful: { resp(label) }\n")

if __name__ == "__main__":
    main()
