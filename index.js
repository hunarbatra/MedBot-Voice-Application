'use strict';

const {
  dialogflow,
  BasicCard} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

const StateName = 'state_name';
const statesEntity = 'states';
const ByeHealthTip = 'Bye Health Tip';
const PregnantMonths = 'pregnant-months';
const HomeRemedies = 'Home remedies';

// Get a random item from an array
const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * (array.length))];
};
/*
const rhymes = [ 
  'https://storage.googleapis.com/actionscodelab-43b4e.appspot.com/Brush%20Karo%20Brush%20Karo%20%20Good%20Habit%20Hindi%20Rhymes%20for%20Children%20%20Infobells.mp3',
  'https://storage.googleapis.com/actionscodelab-43b4e.appspot.com/HealthPhone%E2%84%A2%20Hand%20Washing%20Song%20-%20Hindi.mp3',
];*/
/*
app.intent('Healthcare Rhymes',(conv) => {
	conv.ask("Here's a Song for you!");
    conv.ask('<speak><audio src="https://storage.googleapis.com/actionscodelab-43b4e.appspot.com/Brush%20Karo%20Brush%20Karo%20%20Good%20Habit%20Hindi%20Rhymes%20for%20Children%20%20Infobells.mp3"></audio></speak>');
}); */


const healthTip = [
   'Stress less. All our hormones are controlled by pituitary and other glands. Because of stress, these work in an overdrive and cause imbalance in our bodies. To be healthier, you must learn to relax more often.',
   'Drink at least eight glasses of water. This will keep the UTIs and other renal problems at bay.',
   'Maintain basic genital hygiene. Wash genital areas with a pH-balanced shower gel or soap. This will help prevent any fungal infections.',
   'If you are a women, make sure your vaginal area is well aerated. Wear cotton underwear and avoid synthetic fabrics. Do not wear any underwear when you are sleeping.',
   'Most restaurant foods are rich in saturated fats. You must reduce the fat and oil content in food. It can be poisonous for your health. Eat at home as often as you can',
   'Go for a 40-minute walk five times a week and do three days of resistance workout. To reduce insulin resistance, you must do some resistance exercise like stretching and weights. Walking is an exercise where oxygen is used and that helps in building your stamina.',
   "One should get at least six hours of sleep. If you don't get adequate sleep, your whole system will be disturbed and that has a great impact on your hormones.",
   'If you are happy, everything falls in place, including your general physical, mental and emotional wellbeing. Build a vibrant social life, spend time with family and friends, and aim for happiness',
   'Go for annual health check-ups .It is especially critical if you are over 40.',
   'If you are generally healthy, eat well and exercise. Have no major addictions and you will then be on the road to having a healthy heart.',
   'Stop eating anything white. No white sugar, white flour, and white polished rice. Try jowar, ragi, bajra and oats instead.',
   'Eat a fresh fruit in the morning. Do not reach out for your customary tea or coffee.',
   'Stay away from your gadgets ,cellphones, laptops, and computers for at least one hour before you go to bed.',
   'Stop smoking.  Passive smokers also suffer, so do try and spare your family and friends an early death. Similarly try to avoid alcohol.',
   'Get interested in something creative. Choose a hobby. It is imperative for us to do things we enjoy.',
   'Save some time for yourself. Life will go on even if you are not available. So, spend some time with yourself.',
   'Laugh more.Find humour in everything. Spread positivity and less negativity. One way of doing this is by expressing gratitude for the smallest things in life.',
   'Smoking : No matter how you smoke it, tobacco is dangerous to your health. There are no safe substances in any tobacco products, from acetone and tar to nicotine and carbon monoxide. The substances you inhale don’t just affect your lungs. They can affect your entire body. Smoking can lead to a variety of ongoing complications in the body, as well as long-term effects on your body systems.',
];

app.intent(ByeHealthTip, (conv) => {
	conv.ask("Goodbye. Hope to help you soon! But before you leave, Here's a Health Tip of the Day for you - \n");
	conv.close(getRandomItem(healthTip));
});
/*
app.intent('BMI input', (conv) => {
   const heightInput = conv.parameters['unit-length'];
   const weightInput = conv.parameters['unit-weight'];
   const heightInM = heightInput/100;
   const heightPower = Math.pow(heightInM, 2);
   const bmi = weightInput/heightPower;
   conv.ask("Your BMI is "+bmi);
   if(bmi<18.5)
   {
     conv.ask("You are underweight. You should consult a doctor.");
   }
   
   else if(bmi>18.5 && bmi<24.9)
   {
       conv.ask("Congratulations! Your bmi falls in the normal weight range!!!");
   }

   else if(bmi>25 && bmi<29.9)
   {
        conv.ask("You are overweight. You should consult a doctor");
   }
   
    else
    {
        conv.ask("Error");
    }
});
*/
app.intent('vaccines-followup', (conv) => {
	const babyMonths = conv.parameters['number'];
	if(babyMonths == 1)
	{
		conv.ask("You should get your child immunized with the Hepatitis B, BCG vaccination "+"one dose at birth and OPV Vaccine."+" Contact your Doctor to get these vaccinations as soon as possible"+
			  ".Can I help you with anything else?");
	}

	else if(babyMonths == 2)
	{
		conv.ask("You should get your child immunized with DPT at week 6, Rota Viral and "+
                 "Pneumococcal Conjugate Vaccine at week 6 . Can I help you with anything else?");
	}

    else if(babyMonths == 3 && babyMonths == 4)
    {
    	conv.ask("You should get your child immunized with DPT in week 10 and Pneumococcal Conjugate Vaccine"+
                 "Can I help you with anything else?");
    }

    else if(babyMonths == 5)
    {
    	conv.ask("You should get your child immunized with DPT vaacine in week 14."+
    		     " Can I help you with anything else?");
    }

    else if(babyMonths>=6 && babyMonths<9)
    {
    	conv.ask("You should get your child immunized with Varicella Vaccine between sixth and twelvth month."+
    		"Can I help you with anything else?");
    }

    else if(babyMonths>=9 && babyMonths<=12)
    {
    	conv.ask("You should get your child immunized with Varicella, Japanese Encephalitis and Measles." +
    		"Can I help you with anything else?");
    }

    else if(babyMonths>12 && babyMonths<=15)
    {
    	conv.ask("You should get your child immunized with MMR." +
    		      "Can I help you with anything else?");
    }

    else if(babyMonths>15 && babyMonths<156)
    {
        conv.ask("You should get your child immunized with Hepatitis A and TT."+
        	"Can I help you with anything else?");
    }

    else
    {
    	conv.ask("Oops, these are vaccines for Children upto the age of 13, not for you..");
    }
});

app.intent(HomeRemedies, (conv, {diseases}) => {
    const diseaseName = conv.parameters['diseases'].toLowerCase();

    switch(diseaseName) {
    	case 'burns' : conv.ask("Place the burned area under cold running water for several minutes, until the pain subsides (this will also reduce swelling). Then apply a thin layer of lotion containing aloe vera — or a segment of an aloe leaf, cut lengthwise — directly on the burn.");
    	                 conv.ask('Would you like to know about anything else?');
    	               //  conv.contexts.set('user-wants-more-help');
    		             //conv.contexts.set('awaiting-no');
    	                 break;

    	case 'nose bleed' : conv.ask("Garlic is high in sulphur, which aids with blood clotting—as does Vitamin K. You can take Vitamin K supplements daily during the winter or whenever you are most susceptible to nose bleeds.");
    	                 conv.ask('Would you like to know about anything else?');
    	                // conv.contexts.set('user-wants-more-help');
    		            // conv.contexts.set('awaiting-no');
    	                 break;

    	case 'dandruff' : conv.ask("Prepare a paste of baking soda or lemon by adding a few drops of water and apply on scalp. Neem can also be very helpful in getting rid of dandruff. ");
    	                 conv.ask('Would you like to know about anything else?');
    	                // conv.contexts.set('user-wants-more-help');
    		            // conv.contexts.set('awaiting-no');
    	                 break;

    	case 'heartburn' : conv.ask(" quick tips to get rid of heartburn, include wearing loose clothing, elevating your upper body,you can also try ginger tea.People with acid reflux are generally advised to avoid eating within the three hours before they go to sleep.");
    	                 conv.ask('Would you like to know about anything else?');
    	                 //conv.contexts.set('user-wants-more-help');
    		             //conv.contexts.set('awaiting-no');
    	                 break;

        case 'constipation' : conv.ask("The most effective home remedy for constipation is to drink plenty of water throughout the day. Having fruits like apple,pear,mango,guava,grapes,orange and papaya also provide relief from constipation. Eating two or three dates each morning helps in regular bowel movement.");
    	                 conv.ask('Would you like to know about anything else?');
    	                 //conv.contexts.set('user-wants-more-help');
    		             //conv.contexts.set('awaiting-no');
    	                 break;

    	case 'stomach ache' : conv.ask("To get relief from stomach ache, apply ginger juice on your aching tummy and massage it in circular motion. An alternate is to extract lemon,mint and ginger juice. Take a teaspoon of each type of juice and mix them and add black salt to it. Drink this mixture twice a day to get relief.");
    	                 conv.ask('Would you like to know about anything else?');
    	                 //conv.contexts.set('user-wants-more-help');
    		             //conv.contexts.set('awaiting-no');
    	                 break;

    	case 'cold and cough' : conv.ask("Drink hot water several times a day to remove toxins from system.You can also boil one teaspoon ginger or few eucalyptus leaves in a pint of water. Inhale the steam. This will provide relief from congestion ");
    	                 conv.ask('Would you like to know about anything else?');
    	                 //conv.contexts.set('user-wants-more-help');
    		             //conv.contexts.set('awaiting-no');
    	                 break;

    	case 'fever' : conv.ask("Boil clean leaves of tulsi plant in one litre of water with half teaspoon of clove powder. Drink this every two hours to fight the fever.You can also consume dry ginger with honey.Drink plenty of water to keep yourself hydrated.These measures will help you bring down the body temperature.");
    	                 conv.ask('Would you like to know about anything else?');
    	                 //conv.contexts.set('user-wants-more-help');
    		             //conv.contexts.set('awaiting-no');
    	                 break;


    	case 'toothache' : conv.ask("Apply clove oil to numb your nerves. Do salt water gargles to sanitize your mouth.Chew on a piece of raw garlic as it is a natural antibacterial agent.You can also chew on raw ginger.");
    	                 conv.ask('Would you like to know about anything else?');
    	                 //conv.contexts.set('user-wants-more-help');
    		             //conv.contexts.set('awaiting-no');
    	                 break;

    	case 'menstrual cramps' : conv.ask("Use a heating pad on your belly or lower back to relax the contracting muscles.Take a hot bath. Exercise, some herbal tea can also help.");
    	                 conv.ask('Would you like to know about anything else?');
    	                 //conv.contexts.set('user-wants-more-help');
    		             //conv.contexts.set('awaiting-no');
    	                 break;
                 
    	default : conv.ask("I am not aware about the Home Remedy for"+diseaseName);
    		      conv.ask("Is there anything else that I can help you with?");
    		      //conv.contexts.set('user-wants-more-help');
    		      //conv.contexts.set('awaiting-no');
    		      break;
    }
});


app.intent(PregnantMonths, (conv, {number}) => {
  const locale=conv.user.locale;
	const numberInput = conv.parameters['number'].toLowerCase();
if (locale=="hi")
{ if(numberInput<=3 && numberInput>0) {
		conv.ask('You are in Trimester 1: During the first trimester you have the most important nutrients, folic acid, iron and vitamin B6. Include beans, eggs, leafy greens, beetroot juice, citrus fruits, sprouts, broccoli, nuts and seeds in your diet.');
conv.ask ('Would you like to know when to call a doctor?');
	}

	else if(numberInput>3 && numberInput<7) {
		conv.ask('You are in Trimester 2, the bones of your baby are growing and so is his brain. You need plenty of calcium and vitamin D for growing healthy bones and brain development, so you should include milk products,carrots, radish,coconut,mung beans,spnach,soya beans in your diet.');
		conv.ask('Would you like to when to call a Doctor?');
	}

	else if(numberInput>6 && numberInput<10) {
		conv.ask('You are in Trimester 3 , your baby’s growth will speed up as he gains weight and prepares for life outside the womb.Vitamin K is essential for blood to clot, which is important after childbirth. So you should include Green leafy vegetables, such as kale, spinach, turnip greens, cauliflower, cabbage, mustard, greens, parsley, and green leaf lettuce in your diet.');
		conv.ask('Would you like to when to call a Doctor?');
	}

	else if(numberInput>9 && numberInput<0) {
		conv.ask('default...oops u didnt mention the number of months.. ');
		conv.ask('Would you like to when to call a Doctor?');
	}

	else {
		conv.close('oops Im facing an error. Please try again later...thanks');
	}
  }
  else
  {
	if(numberInput<=3 && numberInput>0) {
		conv.ask(' You are in Trimester 1: During the first trimester the most important nutrients are folic acid, iron and vitamin B6. Include beans, eggs, leafy greens, beetroot juice, citrus fruits, sprouts, broccoli, nuts and seeds in your diet.');
		conv.ask('Would you like to know when to call a Doctor?');
	}

	else if(numberInput>3 && numberInput<7) {
		conv.ask('You are in Trimester 2, the bones of your baby are growing and so is his brain. You need plenty of calcium and vitamin D for growing healthy bones and brain development, so you should include milk products,carrots, radish,coconut,mung beans,spnach,soya beans in your diet.');
		conv.ask('Would you like to when to call a Doctor?');
	}

	else if(numberInput>6 && numberInput<10) {
		conv.ask('You are in Trimester 3 , your baby’s growth will speed up as he gains weight and prepares for life outside the womb.Vitamin K is essential for blood to clot, which is important after childbirth. So you should include Green leafy vegetables, such as kale, spinach, turnip greens, cauliflower, cabbage, mustard, greens, parsley, and green leaf lettuce in your diet.');
		conv.ask('Would you like to when to call a Doctor?');
	}

	else if(numberInput>9 && numberInput<0) {
		conv.ask('default...oops u didnt mention the number of months.. ');
		conv.ask('Would you like to when to call a Doctor?');
	}

	else {
		conv.close('oops Im facing an error. Please try again later...thanks');
	}
  }
});

app.intent(StateName, (conv, {states}) => {
	const stateInput = conv.parameters[statesEntity].toLowerCase();

	switch(stateInput) {
		case 'delhi' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should consist of Meat , nuts ,milk, fruits ");
                        conv.ask('Would you like to know about anything else?');
		               break;
		case 'andhra pradesh' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should consist of milk products, pulses, oils, fruits , nuts.");
                                 conv.ask('Would you like to know about anything else?');
		               break;
		case 'arunachal pradesh' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should consist of milk products, pulses, oils, fruits , nuts. ");
                                   conv.ask('Would you like to know about anything else?');
		               break;
		case 'assam' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should consist of milk products, pulses, oils, fruits , nuts. ");
                        conv.ask('Would you like to know about anything else?');
		               break;
		case 'bihar' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should consist of Meat , nuts ,milk, fruits");
                        conv.ask('Would you like to know about anything else?');
		               break;
		case 'chhattisgarh' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should consist of Meat, milk products, pulses, oils, fruits , nuts, ");
                               conv.ask('Would you like to know about anything else?');
		               break;
		case 'goa' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should consist of Pulses and legumes , milk, ,wheat, fruits , nuts ,green leafy vegetabes ");
                      conv.ask('Would you like to know about anything else?');
		               break;
		case 'gujarat' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should include Vitamin rich food like leafy vegetables,fish and milk products ");
                          conv.ask('Would you like to know about anything else?');
		               break;
		case 'haryana' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should consist of Meat , nuts ,milk, fruits ");
                          conv.ask('Would you like to know about anything else?');
		               break;
		case 'himachal pradesh' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should include Cereal, pulses and legumes, fruit, meat, egg, oil, nuts ");
                                   conv.ask('Would you like to know about anything else?');
		               break;
		case 'jammu and kashmir' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should Include iron rich foods like legumes,citrus fruits,dry fruits,nuts");
                                    conv.ask('Would you like to know about anything else?');
		               break;
		case 'jharkhand' : conv.ask("Heres a Local Food Recommendation for you for" +states + " Your diet should include soyabean, pulses and legumes, bengal grams, maize, milk , meat , green leafy vegetables and nuts.");
                            conv.ask('Would you like to know about anything else?');
		               break;
		case 'karnataka' : conv.ask("Heres a Local Food Recommendation for you for " +states + "  Your diet should consist of Pulses and legumes , milk, ,wheat, fruits , nuts ,green leafy vegetabes");
                            conv.ask('Would you like to know about anything else?');
		               break;
		case 'kerala' : conv.ask("Heres a Local Food Recommendation for you for " +states +  "  Your diet should consist of Pulses and legumes , milk, ,wheat, fruits , nuts ,green leafy vegetabes ");
                         conv.ask('Would you like to know about anything else?');
		               break;
		case 'madhya pradesh' : conv.ask("Heres a Local Food Recommendation for you for " +states  + "Your diet should consist of Soya bean, rice ,milk products, eggs, meat, nuts, vegetables ");
                                 conv.ask('Would you like to know about anything else?');
		               break;
		case 'manipur' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should consist of milk products, pulses, oils, fruits , nuts. ");
                          conv.ask('Would you like to know about anything else?');
                        break;
		case 'maharashta' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Soya bean, rice ,milk products, eggs, meat, nuts, vegetables " );
                             conv.ask('Would you like to know about anything else?');
		               break;
		case 'meghalaya' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should consist of milk products, pulses, oils, fruits , nuts. ");
                            conv.ask('Would you like to know about anything else?');
		               break;
		case 'mizoram' : conv.ask("Heres a Local Food Recommendation for you for" +states + " Your diet should consist of milk products, pulses, oils, fruits , nuts.");
                          conv.ask('Would you like to know about anything else?');
		               break;
		case 'nagaland' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should consist of milk products, pulses, oils, fruits , nuts. ");
                           conv.ask('Would you like to know about anything else?');
		               break;
		case 'odisha' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should include soyabean, pulses and legumes, bengal grams, maize, milk , meat , green leafy vegetables and nuts. ");
                         conv.ask('Would you like to know about anything else?');
		               break;
		case 'punjab' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should consist of meat,nuts,milk and fruits ");
                        conv.ask('Would you like to know about anything else?');
		               break;
		case 'rajasthan' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should include Soya bean, rice ,milk products, eggs, meat, nuts, vegetables ");
                            conv.ask('Would you like to know about anything else?');
		               break;
		case 'sikkim' : conv.ask("Heres a Local Food Recommendation for you for " +states + " Your diet should consist of milk products, pulses, oils, fruits , nuts.");
                         conv.ask('Would you like to know about anything else?');
		               break;
		case 'tamil nadu' : conv.ask("Heres a Local Food Recommendation for you for " +states + "  Your diet should consist of Pulses and legumes , milk, wheat, fruits ,nuts ,green leafy vegetabes ");
                             conv.ask('Would you like to know about anything else?');
		               break;
		case 'telangana' : conv.ask("Heres a Local Food Recommendation for you for" +states + " Your diet should consist of milk products, pulses, oils, fruits , nuts. ");
                            conv.ask('Would you like to know about anything else?');
		               break;
		case 'tripura' : conv.ask("Heres a Local Food Recommendation for you for" +states + " Your diet should consist of milk products, pulses, oils, fruits , nuts. ");
                          conv.ask('Would you like to know about anything else?');
		               break;
		case 'uttar pradesh' : conv.ask("Heres a Local Food Recommendation for you for" +states + "  Your diet should consist of Meat , nuts ,milk, fruits ");
                                conv.ask('Would you like to know about anything else?');
		               break;
		case 'uttarakhand' : conv.ask("Heres a Local Food Recommendation for you for" +states + "  Your diet should include Cereal, pulses and legumes, fruit, meat, egg, oil, nuts");
                              conv.ask('Would you like to know about anything else?');
		               break;     
		case 'west bengal' : conv.ask("Heres a Local Food Recommendation for you for "+states  + " Your diet should include soyabean, pulses and legumes, bengal grams, maize, milk , meat , green leafy vegetables and nuts. "); 
                             
                              conv.ask('Would you like to know about anything else?');
		               break;                      

		default : conv.ask("I'm facing some problems. Please try again later.");
	}
 });
     

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);