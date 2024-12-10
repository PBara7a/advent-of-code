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

	private static List<List<String>> generatePermutations( List<String> operators, int length ) {
		if ( length == 0 ) {
			return List.of( new ArrayList<>() );
		}

		List<List<String>> permutations = new ArrayList<>();
		for ( String operator : operators ) {
			for ( List<String> subPermutation : generatePermutations( operators, length - 1 ) ) {
				List<String> newPermutation = new ArrayList<>(subPermutation);
				newPermutation.add( operator );
				permutations.add( newPermutation );
			}
		}
		return permutations;
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

		return testMap.entrySet().stream()
				.filter( entry -> {
					int permutationLength = entry.getValue().size() - 1;
					operatorPermutations.computeIfAbsent( permutationLength, len -> generatePermutations( validOperators, len ) );
					return isValidTest( entry.getKey(), entry.getValue(), operatorPermutations.get( permutationLength ) );
				} )
				.mapToLong( Map.Entry::getKey )
				.sum();
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

	public static Operation getOperation( String operator ) {
		return Arrays.stream( values() )
				.filter( operation -> operation.operator.equals( operator ) )
				.findFirst()
				.orElseThrow( IllegalArgumentException::new );
	}
}
