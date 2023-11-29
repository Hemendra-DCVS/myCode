import java.util.*;
public class Solution {
	public static void main(String[] args) {
		/* Your class should be named Solution.
	 	* Read input as specified in the question.
	 	* Print output as specified in the question.
		*/
		Scanner sc = new Scanner(System.in);
		int n = sc.nextInt();
		for(int i = 1; i<=n; i++){
			for(int j = 0; j < n - i; j++){
				System.out.print(" ");
			}
			for(int k=0; k<i; k++){
				System.out.print("*");
			}
			for(int l = 1; l < i; l++){

				System.out.print("*");
			}
			System.out.println();
		}
	}
}