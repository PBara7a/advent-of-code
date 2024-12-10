package Day7;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution {

	public static void main( String[] args ) throws IOException {
		List<String> lines = Files.readAllLines( Paths.get( "src/2024/Day7/input.txt" ) );

		Map<Long, List<Integer>> testMap = createTestMap( lines );
		List<String> validOperators = new ArrayList<>( List.of( "+", "*" ) );

		System.out.printf( "Part A: %d%n",  sumValidTestValues( testMap, validOperators ) );
		validOperators.add( "||" );
		System.out.printf( "Part B: %d%n",  sumValidTestValues( testMap, validOperators ) );
	}

	private static Map<Long, List<Integer>> createTestMap( List<String> lines ) {
		Map<Long, List<Integer>> testMap = new HashMap<>();

		for ( String line : lines ) {
			String[] parts = line.split( ":\\s+" );
			Long result = Long.parseLong( parts[0] );
			List<Integer> operands = Arrays.stream( parts[1].split( "\\s+" ) )
					.map( Integer::parseInt )
					.toList();
			testMap.put( result, operands );
		}
		return testMap;
	}

	public static List<List<String>> generatePermutations( List<String> operators, int length ) {
		List<List<String>> permutations = new ArrayList<>();

		generatePermutationsHelper( operators, length, new ArrayList<>(), permutations );
		return permutations;
	}

	private static void generatePermutationsHelper( List<String> operators, int length,
			List<String> current, List<List<String>> permutations ) {
		if ( current.size() == length ) {
			permutations.add( new ArrayList<>(current) );
			return;
		}

		for ( String operator : operators ) {
			current.add(operator);
			generatePermutationsHelper( operators, length, current, permutations );
			current.removeLast();
		}
	}

	private static boolean isValidTest( long result, List<Integer> operands, List<List<String>> operators ) {
		for ( List<String> permutation : operators ) {
			long total = operands.getFirst();
			for ( int i = 0; i < operands.size() - 1; i++ ) {
				Operation operation = Operation.getOperation( permutation.get( i ) );
				total = operation.apply( total, operands.get( i + 1 ) );
			}
			if ( total == result ) {
				return true;
			}
		}
		return false;
	}

	private static long sumValidTestValues ( Map<Long, List<Integer>> testMap, List<String> validOperators ) {
		Map<Integer, List<List<String>>> operatorPermutations = new HashMap<>();

		long totalValidTestValues = 0;

		for ( Map.Entry<Long, List<Integer>> test : testMap.entrySet() ) {
			long result = test.getKey();
			List<Integer> operands = test.getValue();
			int permutationLength = operands.size() - 1;

			if ( !operatorPermutations.containsKey( permutationLength ) ) {
				operatorPermutations.put( permutationLength, generatePermutations( validOperators, permutationLength ) );
			}

			List<List<String>> testOpPermutations = operatorPermutations.get( permutationLength );

			if ( isValidTest( result, operands, testOpPermutations ) ) {
				totalValidTestValues += result;
			}
		}
		return totalValidTestValues;
	}

}

enum Operation {

	ADD("+") {
		public long apply( long operand1, long operand2 ) {
			return operand1 + operand2;
		}
	},
	MULTIPLY("*") {
		public long apply( long operand1, long operand2 ) {
			return operand1 * operand2;
		}
	},
	CONCATENATE("||") {
		public long apply( long operand1, long operand2 ) {
			final String concatenatedOperands = String.valueOf( operand1 ) + operand2;
			return Long.parseLong( concatenatedOperands );
		}
	};

	private final String operator;

	Operation( String operator ) {
		this.operator = operator;
	}

	public abstract long apply( long x, long y );

	public String getOperator() {
		return operator;
	}

	public static Operation getOperation( String operator ) {
		for ( Operation operation : Operation.values() ) {
			if ( operation.getOperator().equals( operator ) ) {
				return operation;
			}
		}
		throw new IllegalArgumentException( "Invalid operation: " + operator );
	}
}
