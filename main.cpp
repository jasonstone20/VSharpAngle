#include <iostream>
#include <cmath>
#include <cstdlib>
#include <cstdio>
#include <string>
#include <sstream>

#define PI 3.14159265

void get_int(int& d, std::string prompt, std::string fail);
void get_float(float& d, std::string prompt, std::string fail);
float deg2rad(float Degree);
float rad2deg(float Degree);
float dcos(float Degree);
float dsin(float Degree);
float dcsc(float Degree);
void cosout(float R);
void sinout(float D, float A);
void dEst();
float StickAngle(float Length, float Height);
float SideAngle(float SideA, float SideB, float SideC);
float MeasuredAngle (float MWidth, float MHeight);
float AbsoluteVal(float abv);
float MetricCon();
int DisplayTotal();
void Rotate();
void Tilting();
void Chart();
void Angle();
void Passes();
int Quit();
int Menu();

int main(int argc, int *argv[])
{
     Menu();
     return 0;
}

void get_int(int& d, std::string prompt, std::string fail)
{
    while(1) {

        std::cout << prompt;
        std::string str;
        std::cin >> str;

        std::istringstream ss(str);
        int val1;
        ss >> val1;

        if(!ss.eof()) {
            std::cout << fail;
            continue;
        } else {
            d = val1;
            break;
        }
    }
}

void get_float(float& d, std::string prompt, std::string fail)
{
    while(1) {

        std::cout << prompt;
        std::string str;
        std::cin >> str;

        std::istringstream ss(str);
        float val1;
        ss >> val1;

        if(!ss.eof()) {
            std::cout << fail;
            continue;
        } else {
            d = val1;
            break;
        }
    }
}

float deg2rad(float Degree)
{
    return ((Degree) * (PI / 180));
}

float rad2deg(float Degree)
{
    return ((Degree) / (PI / 180));

}

float dcos(float Degree)
{
    return cos(deg2rad(Degree));

}

float dsin(float Degree)
{
    return sin(deg2rad(Degree));
}

float dcsc(float Degree)
{
    return 1/sin(deg2rad(Degree));
}

void cosout(float R)
{
    std::cout << "COS R = " << dcos(R) << std::endl;
}

void sinout(float D, float A)
{
    std::cout << (dsin(D)/dsin(A)) << std::endl;
}
void dEst()
{
    for (float x = 1 ; x < 90 ; x++ )
    {
        cosout(x);
    }
    for (float x = 1 ; x < 90 ; x++ )
    {
        sinout(15 , x);
    }
    for (float x = 1 ; x < 90 ; x++ )
    {
        sinout(20 , x);
    }
}

float StickAngle(float Length, float Height)
{

    return (Length - Height) * (0.125);


}

float SideAngle (float SideA, float SideB, float SideC)
{
    float PowA = pow(SideA, 2);
    float PowB = pow(SideB, 2);
    float PowC = pow(SideC, 2);
    float Top (PowA+PowB-PowC);
    float Bottom (2*SideA*SideB);

    float Answer = (Top/Bottom);
    float ACosAnswer = acos(Answer);
    //float ACosAnswer = (CosAnswer);
    float Inclusive =  rad2deg(ACosAnswer);
    float PerSide = Inclusive/2;
    std::cout <<  "Inclusive: \n" << Inclusive << "\nPer Side: \n";
    return PerSide;
}

float MeasuredAngle (float MWidth, float MHeight)
{
    float ans;
    float ang;
    ans = ((MWidth/2)/MHeight);
    ang = asin(ans);
    return rad2deg(ang);
}



float AbsoluteVal(float AbsoluteValue)
{

    return std::abs(AbsoluteValue);
}

float MetricCon(float met)
{
    return (met)*(2.54);
}

int DisplayTotal(int NumberOfPasses)
{
    //int NumberOfPasses = 0;
    int x = 0;
    int y = 0;
    int Total = 0;
    int XStrokes = 0;
    int StartingNumber = 0;
    y=(NumberOfPasses/10)+1;
    x=(NumberOfPasses*y);
    StartingNumber=2*NumberOfPasses;
    Total=(x+2)+(StartingNumber);
    XStrokes=(Total)/2;
    for (NumberOfPasses; NumberOfPasses >= 9; NumberOfPasses-=10)
    {
        std::cout << "\t-----" << NumberOfPasses << "-----"<< std::endl;

    }
        std::cout << "\t-----05-----" << std::endl;
        std::cout << "\t-----03-----" << std::endl;
        std::cout << "\t-----02-----" << std::endl;
        std::cout << "\t-----01-----" << std::endl;
        std::cout << "\t     " << Total <<  " <<Total Passes Counted"  << std::endl;
        std::cout << "\t     " << XStrokes << " <<X-Strokes/Passes Per Side\n";
};

void Rotate()
{
    float DesiredRotate;
    float StickAngleRotate;
    // std::cout << "Enter desired angle" << std::endl;
    //std::cin >> d;
    get_float(DesiredRotate, "Enter desired angle ", "Sorry, that's not an number. \n");
    //std::cout << "Enter V stick angle" << std::endl;
    //std::cin >> a;
    get_float(StickAngleRotate, "Enter V Stick Angle ", "Sorry, that's not an number. \n");
    std::cout << "For Rotating:  " << rad2deg(acos(dcsc(StickAngleRotate)*dsin(DesiredRotate))) << std::endl;
    std::cout << "Press Enter" << std::endl;
    std::cin.ignore().get();
}

void Tilting()
{
    float DesiredAngle;
    float AngleOfStick;
    float ResultAngle;
    float MetricResult;
    //std::cout << "Enter desired angle" << std::endl;
    //std::cin >> d;
    get_float(DesiredAngle, "Enter desired angle ", "Sorry, that's not an number. \n");
    //std::cout << "Enter V stick angle" << std::endl;
    //std::cin >> a;
    get_float(AngleOfStick, "Enter V Stick Angle ", "Sorry, that's not an number. \n");
    std::cout << "For tilting:" << std::endl;
    std::cout << std::endl;
    ResultAngle = StickAngle(DesiredAngle,AngleOfStick);
    if (ResultAngle > 0)
    {
        std::cout << "Near Side ";
    }
    else
    {
        std::cout << "Far Side ";
    }
    MetricResult = AbsoluteVal(StickAngle(DesiredAngle,AngleOfStick));
    std::cout << "Height to raise: Inches> " << AbsoluteVal(ResultAngle) << " CM> "<< MetricCon(MetricResult) <<"\nStick Angles: " << "\n Near Stick: " <<
        DesiredAngle << " Far Stick: " << (AngleOfStick) - (DesiredAngle - AngleOfStick) << std::endl;;
    std::cout << "Press Enter" << std::endl;
    std::cin.ignore().get();
}

void Chart()
{
    //std::cout << "Enter desired angle" << std::endl;
    // std::cin >> d;
    //std::cout << "Enter V stick angle" << std::endl;
    //std::cin >> a;
    float ChartAngle;
    get_float(ChartAngle, "Enter V Stick Angle ", "Sorry, that's not an number. \n");
    std::cout << "Angle Solutions: -------------------------" << std::endl;
    for ( int x = 1 ;  x < ChartAngle;  x++)
    {

        std::cout << "R for " << ChartAngle << "* @ " << x << " -- " << rad2deg(acos(dcsc(ChartAngle)*dsin(x))) << std::endl;
        /*for (int x = 1; x < 20 ; x++)
            {
                std::cout << "R for 20* @ " << x << " -- " << rad2deg(acos(dcsc(20)*dsin(x))) << std::endl;
            }
            for (int x = 1; x < 25 ; x++)
            {
                std::cout << "R for 25* @ " << x << " -- " << rad2deg(acos(dcsc(25)*dsin(x))) << std::endl;
            }
            */

    }
    std::cout << "Press Enter" << std::endl;
    std::cin.ignore().get();
}

void Angle()
{
    //std::cout << "Enter Measured Width: ";
    //std::cin >> MW;
    float MeasuredWidth;
    float MeasuredHeight;
    float SideA;
    float SideB;
    float SideC;
    int sel = 0;

    get_int(sel, "2 or 3 known sides?: ", "Please enter 2 or 3. \n");

    switch (sel)
    {
        case 2:
        {
            get_float(MeasuredWidth, "Enter Measured Width: ", "Sorry, that's not number. \n");
            std::cout << std::endl;
            get_float(MeasuredHeight, "Enter Measured Height: ", "Sorry, that's not an number. \n");
            std::cout << MeasuredAngle(MeasuredWidth,MeasuredHeight);
            std::cout << std::endl;
            break;
        }
        case 3:
        {
            get_float(SideC, "Enter Measured Width: ", "Sorry, that's not number. \n");
            std::cout << std::endl;
            get_float(SideA, "Enter Side 1: ", "Sorry, that's not number. \n");
            std::cout << std::endl;
            get_float(SideB, "Enter Side 2: ", "Sorry, that's not number. \n");
            std::cout << std::endl;

            std::cout << SideAngle(SideA, SideB, SideC);
            break;
        }
        default:
        {
        std::cout << "Enter 2 or 3" << std::endl;
        }
    }
    std::cout << std::endl << "Press Enter" << std::endl;
    std::cin.ignore().get();
}


void Passes()
{
    int NumberOfPasses;
    get_int(NumberOfPasses, "Please enter starting passes per side: ", "Sorry, that's not an integer. \n");
    //cout << "Enter number of passes per side:> " ;
    //cin >> NumberOfPasses;
    //NumberOfPasses=StartingNumber;
    if (NumberOfPasses >=10 )
    {
        DisplayTotal(NumberOfPasses);
    }
    else
    {
    std::cout << "Please enter a number 10 or greater\n";
    //main();
    }
    std::cout << std::endl << "Press Enter" << std::endl;
    std::cin.ignore().get();
}

int Quit()
{
    //return EXIT_SUCCESS;
    //exit(0);
}

int Menu()
{
    //float DesiredAngle;  // Angle desired
    //float AngleOfSticks;  // Angle of v-sticks
    //dEst();
    //float h;
    //float MH;
    //float MW;
    //float hh;
    int sel;

    //std::cout << "Please Select 1)Rotate, 2)Tilting, 3)Chart, or 4)Angle:>";
    //std::cin >> sel;
    while (1)
    {
        get_int(sel, "Please Select 1)Rotate, 2)Tilting, 3)Chart, 4)Angle, 5)Pass Count 6)Exit:>", "Please enter a valid selection \n");
        switch (sel)
        {
        case 1:
        //case '1':
        //case 'R':
        //case 'r':
        {
            Rotate();
            break;
        }
        case 2:
        //case 'T':
        //case 't':
        {
            Tilting();
            break;
        }
        case 3:
        //case 'C':
        //case 'c':
        {
            Chart();
            break;
        }
        case 4:
        //case 'A':
        //case 'a':
        {
            Angle();
            break;
        }
        case 5:
        {
            Passes();
            break;
        }
        case 6:
        {
            return 0;
//            return EXIT_SUCCESS;
            //Quit();
            break;
        }

        default:
        {
            std::cout << "Please Enter A Valid Option \n";
        }
        }
    }

}
