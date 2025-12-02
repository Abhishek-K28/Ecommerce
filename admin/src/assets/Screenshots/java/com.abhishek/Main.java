public class Main {
public static void main(String[] args) {
    int n =3;
    
    System.out.println(prink(n));
}
static int prink(int n){
    if(n==0){
        
        return 0 ;
    }
    if(n==1){
        return 1;
    }
    
 return prink(n-1)+prink(n-2);

    
     
}
    
}